'use client'
import { createContext, useContext, useState } from 'react'

type AppContextType = {
  spotifyInfo: any
  setSpotifyInfo: React.Dispatch<React.SetStateAction<any>>
  currentPitch: number | null
  setCurrentPitch: React.Dispatch<React.SetStateAction<number | null>>
  averagePitch: number | null
  setAveragePitch: React.Dispatch<React.SetStateAction<number | null>>
  currentSong: any
  setCurrentSong: React.Dispatch<React.SetStateAction<any>>
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: any) {
  const [spotifyInfo, setSpotifyInfo] = useState<any>(null)
  const [currentPitch, setCurrentPitch] = useState<number | null>(null)
  const [averagePitch, setAveragePitch] = useState<number | null>(null)
  const [currentSong, setCurrentSong] = useState<any>(null)

  return (
    <AppContext.Provider
      value={{
        spotifyInfo,
        setSpotifyInfo,
        currentPitch,
        setCurrentPitch,
        averagePitch,
        setAveragePitch,
        currentSong,
        setCurrentSong,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within the AppProvider.')
  return ctx
}
