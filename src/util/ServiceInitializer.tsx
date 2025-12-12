'use client'
import { useEffect } from 'react'
import { InitSpotifyService } from '@/util/initSpotifyService'

export default function ServiceInitializer() {
  useEffect(() => {
    InitSpotifyService()
  }, [])

  return null
}
