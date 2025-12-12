'use client'

import { useStore } from 'zustand'
import { serverStore } from '@/lib/serverAppState'

export function useServerAppState() {
  return useStore(serverStore)
}
