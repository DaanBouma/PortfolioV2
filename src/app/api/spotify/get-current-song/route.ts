import { NextResponse } from 'next/server'
import { getNowPlaying } from '@/lib/spotify'
import { Error } from '@/lib/error'

export async function GET() {
  try {
    const data = await getNowPlaying()
    if (!data?.item) return NextResponse.json({ playing: false })

    const track = {
      playing: data.is_playing,
      title: data.item.name,
      artists: data.item.artists.map((a: any) => a.name),
      album: data.item.album.name,
      duration_ms: data.item.duration_ms,
      progress_ms: data.progress_ms,
      spotifyId: data.item.id,
      albumImage: data.item.album.images[0]?.url,
    }

    return NextResponse.json(track)
  } catch (err: any) {
    Error('Error fetching current song')
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
