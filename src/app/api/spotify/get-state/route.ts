import { NextResponse } from 'next/server'
import { serverStore } from '@/lib/serverAppState'

export async function GET() {
  const state = serverStore.getState()
  return NextResponse.json(state)
}
