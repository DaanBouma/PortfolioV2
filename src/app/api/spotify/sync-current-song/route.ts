// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { serverStore } from '@/lib/serverAppState'
import { Logger } from '@/lib/logger'
import { Error } from '@/lib/error'

Logger("Sync-current-song endpoint called")
const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const spotifyRes = await axios.get('http://localhost:3000/api/spotify/get-current-song')
    const { spotifyId } = spotifyRes.data

    if (!spotifyId) {
      Logger("No active song!")
      return NextResponse.json({ error: 'No active song!' }, { status: 400 })
    }

    // 1: recorded versie zoeken
    let song = await prisma.song.findFirst({
      where: { spotifyId, hasRecording: true },
      include: { pitchFrames: true, recordedFrames: true },
    })

    if (song) {
      Logger(`Using recorded version for ${song.title}`)
    }

    if (!song) {
      song = await prisma.song.findFirst({
        where: { spotifyId, hasRecording: false },
        include: { pitchFrames: true },
      })

      if (song) {
        Logger(`Using generated version for ${song.title}`)
      }
    }

    if (!song) {
      Logger(`No recorded or generated version found, generating new data for ID ${spotifyId}`)
      await axios.get(`http://localhost:3000/api/spotify/collect-song-data?trackId=${spotifyId}`)

      song = await prisma.song.findFirst({
        where: { spotifyId },
        include: { pitchFrames: true, recordedFrames: true },
      })

      if (song) {
        Logger(`Generated version created for ${song.title}`)
      }
    }

    if (!song) {
      Error("Song not found")
      return NextResponse.json({ error: 'Cannot get song' }, { status: 404 })
    }

    serverStore.setState({
      currentSong: {
        id: song.id,
        spotifyId: song.spotifyId,
        title: song.title,
        artist: song.artist,
        bpm: song.bpm,
        duration: song.duration,
        pitchFrames: song.pitchFrames.map((f) => ({
          time: f.time,
          frequency: f.frequency,
        })),
        albumImage: song.albumImage,
        artists: song.artists,
        progress_ms: 0,
      },
      isAnalyzing: false,
      lastUpdated: Date.now(),
    })

    Logger(`Song synchronized: ${song.title} - ${song.artist}`)
    return NextResponse.json({ ok: true, song })
  } catch (err: any) {
    const message = `Sync-Current-Song error ${err.message}`
    Error(message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
