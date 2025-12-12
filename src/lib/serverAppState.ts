import { createStore } from 'zustand/vanilla'

export const serverStore = createStore((set) => ({
  currentSong: null as
    | {
        id: number
        spotifyId: string
        title: string
        artist: string
        bpm: number
        duration: number
        pitchFrames: { time: number; frequency: number }[]
        albumImage?: string
        artists?: string[]
        progress_ms?: number
      }
    | null,
  isAnalyzing: false,
  lastUpdated: null as number | null,

  setCurrentSong: (song: any) => set({ currentSong: song }),
}))
