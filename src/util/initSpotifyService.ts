  'use client'
  import { useEffect, useRef } from 'react'
  import { useAppContext } from '@/hooks/AppProvider'
  import { useServerAppState } from '@/store/useServerAppState'

  export function InitSpotifyService() {
    const {
      setSpotifyInfo,
      setCurrentPitch,
      setAveragePitch,
      setCurrentSong,
      currentSong,
    } = useAppContext()

    const { setCurrentSong: setServerSong }: any = useServerAppState()
    const progressRef = useRef<number>(0)
    const lastUpdateTime = useRef<number>(Date.now())
    const isPlayingRef = useRef<boolean>(false)

    useEffect(() => {
      const parseIsPlaying = (data: any) => {
        if (!data) return false
        if (typeof data.is_playing === 'boolean') return data.is_playing
        if (typeof data.isPlaying === 'boolean') return data.isPlaying
        if (typeof data.playing === 'boolean') return data.playing
        if (data.is_playing === 'true' || data.isPlaying === 'true' || data.playing === 'true') return true
        if (data?.status === 'playing') return true
        return false
      }

      const sync = async () => {
        try {
          const res = await fetch('/api/spotify/sync-current-song')
          const data = await res.json()
          if (data.song) {
            setCurrentSong(data.song)
            setServerSong(data.song)
          }
        } catch (err) {
          console.error('Sync error:', err)
        }
      }

      const getSpotifyInfo = async () => {
        try {
          const res = await fetch('/api/spotify/get-current-song')
          const data = await res.json()
          const wasPlaying = isPlayingRef.current
          const isPlaying = parseIsPlaying(data)

          if (data.progress_ms !== undefined && data.progress_ms !== null) {
            progressRef.current = data.progress_ms
          }

          if (isPlaying && !wasPlaying) {
            lastUpdateTime.current = Date.now()
          }

          isPlayingRef.current = isPlaying
          setSpotifyInfo({ ...data, is_playing: isPlaying })
        } catch (err) {
          console.error('Spotify fetch error:', err)
        }
      }

      sync()
      getSpotifyInfo()

      const spotifyInterval = setInterval(getSpotifyInfo, 3000)

      const frameInterval = setInterval(() => {
        if (!isPlayingRef.current) return
        const now = Date.now()
        const delta = now - lastUpdateTime.current
        lastUpdateTime.current = now
        progressRef.current += delta

        setSpotifyInfo((prev: any) =>
          prev ? { ...prev, progress_ms: progressRef.current } : prev
        )

        if (currentSong?.pitchFrames?.length) {
          const timeInSeconds = progressRef.current / 1000
          const frames = currentSong.pitchFrames
          const fps = 100
          let idx = Math.round(timeInSeconds * fps)
          if (idx < 0) idx = 0
          if (idx >= frames.length) idx = frames.length - 1
          const currentFrame = frames[idx]
          if (currentFrame) setCurrentPitch(currentFrame.frequency)
        }
      }, 10)

      return () => {
        clearInterval(spotifyInterval)
        clearInterval(frameInterval)
      }
    }, [currentSong])

    useEffect(() => {
      if (currentSong?.pitchFrames?.length) {
        const total = currentSong.pitchFrames.reduce(
          (sum: number, f: any) => sum + f.frequency,
          0
        )
        setAveragePitch(total / currentSong.pitchFrames.length)
      } else {
        setAveragePitch(null)
      }
    }, [currentSong])

    return null
  }
