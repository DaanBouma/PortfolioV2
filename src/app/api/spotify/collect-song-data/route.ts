// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import aubio from 'aubiojs'
import * as wav from 'wav-decoder'
import { parseFile } from 'music-metadata'
import MusicTempo from 'music-tempo'
import { PrismaClient } from '@prisma/client'
import { Logger } from "@/lib/logger"
import { Error as Error } from "@/lib/error"
const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const trackId = searchParams.get('trackId')
  if (!trackId) {
    Error("trackId is missing")
    return NextResponse.json({ error: 'trackId is missing' }, { status: 400 })
  }

  try {
    Logger("Retrieving access token", null, "Retrieving access token")

    const tokenRes = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
      },
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const accessToken = tokenRes.data.access_token
    Logger(null, null, "Access token retrieved")

    Logger(null, null, `Fetching Spotify track info: ${trackId}`)
    const trackRes = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const track = trackRes.data
    const artist = track.artists[0].name
    const title = track.name

    const safeArtist = artist.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_')
    const safeTitle = title.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_')
    const fileName = `${safeArtist}-${safeTitle}.mp3`

    const tempDir = path.join(process.env.TEMP_DIR || '/home/container/temp')
    fs.mkdirSync(tempDir, { recursive: true })
    const outputPath = path.join(tempDir, fileName)

    const searchQuery = `${title} ${artist} lyrics`

    Logger("Starting download", "Downloading has been started", `Starting YouTube download: ${searchQuery}`)

    const yt = spawn('/home/container/yt-dlp', [
      '--default-search', 'ytsearch',
      '--extract-audio',
      '--audio-format', 'mp3',
      '--audio-quality', '0',
      '--no-playlist',
      '--user-agent', 'Mozilla/5.0',
      '--no-check-certificate',
      '--extractor-args', 'youtube:player_client=android',
      '-o', outputPath,
      searchQuery,
    ])

    let startTime = Date.now()
    let firstLog = true

    yt.stdout.on('data', () => {
      if (firstLog) {
        Logger(null, null, "yt-dlp started")
        firstLog = false
      }
    })

    yt.stderr.on('data', () => {
      if (firstLog) {
        Logger(null, null, "yt-dlp started")
        firstLog = false
      }
    })

    await new Promise((resolve, reject) => {
      yt.on('close', (code) => {
        if ([0, 1, 101].includes(code ?? -1)) resolve(true)
        else reject(new Error(`yt-dlp failed with exit code ${code}`))
      })
    })

    const endTime = Date.now()
    const durationSec = Math.round((endTime - startTime) / 1000)

    Logger("Download complete", `Song download finished in ${durationSec}s`, `Download completed: ${outputPath}`)

    const wavPath = path.join(tempDir, 'converted.wav')
    const metadata = await parseFile(outputPath)

    const codec = metadata.format.codec || 'mp3'
    const bitrate = metadata.format.bitrate ? Math.round(metadata.format.bitrate / 1000) : 320
    const duration = metadata.format.duration || 0

    Logger("Converting", null, "Converting MP3 to WAV")

    await new Promise((resolve, reject) => {
      ffmpeg(outputPath)
        .audioFrequency(44100)
        .toFormat('wav')
        .on('end', resolve)
        .on('error', reject)
        .save(wavPath)
    })

    Logger("Converted", null, "WAV conversion completed")

    const buffer = fs.readFileSync(wavPath)
    const audioData = await wav.decode(buffer)
    const channelData = audioData.channelData?.[0]

    if (!channelData || channelData.length === 0) {
      Error("No valid audio data found in WAV file")
      throw new Error('No valid audio data found in WAV file.')
    }

    Logger(null, null, "Analyzing BPM")

    const sampleWindow = channelData.slice(0, 44100 * 30)
    const bpmAnalyzer = new MusicTempo(sampleWindow)
    const bpm = Math.round(bpmAnalyzer.tempo)

    Logger(null, null, `BPM detected: ${bpm}`)

    Logger(null, null, "Analyzing pitch frames")

    const { Pitch } = await aubio()
    const pitchDetector = new Pitch('default', 2048, 512, 44100)
    const pitchFrames = []

    for (let i = 0; i < channelData.length; i += 512) {
      const slice = channelData.slice(i, i + 512)
      if (slice.length < 512) continue
      const frame = new Float32Array(slice)
      const freq = pitchDetector.do(frame)
      const time = i / 44100
      if (typeof freq === 'number' && !isNaN(freq) && freq > 50 && freq < 2000)
        pitchFrames.push({ time, frequency: freq })
    }

    Logger(null, null, "Saving song in database")

    const song = await prisma.song.create({
      data: {
        title,
        artist,
        duration,
        bitrate,
        sampleRate: 44100,
        codec,
        bpm,
        spotifyId: trackId,
      },
    })

    await prisma.pitchFrame.createMany({
      data: pitchFrames.map((f) => ({
        time: f.time,
        frequency: f.frequency,
        songId: song.id,
      })),
    })

    fs.rmSync(tempDir, { recursive: true, force: true })

    Logger("Done", null, "Analysis completed")

    return NextResponse.json({
      message: 'Analysis completed',
      songId: song.id,
      spotifyId: trackId,
      framesStored: pitchFrames.length,
      title,
      artist,
      bpm,
    })
  } catch (err) {
    Error(err?.message || "Unknown error")
    return NextResponse.json(
      { error: 'Analysis failed', details: err.message },
      { status: 500 }
    )
  }
}
