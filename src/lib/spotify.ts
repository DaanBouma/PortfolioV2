const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'

export async function getAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64')

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN as string,
    }),
  })

  if (!res.ok) {
    console.error('Spotify token fetch error:', res.status, await res.text())
    throw new Error('Spotify access token request failed')
  }

  return res.json()
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken()

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
  })

  // Geen actieve song of Spotify stuurt lege response
  if (res.status === 204 || res.status === 202) return null

  // Spotify stuurt soms 404 als niets speelt
  if (res.status === 404) return null

  if (!res.ok) {
    console.error('Spotify now playing fetch error:', res.status, await res.text())
    throw new Error('Spotify now playing request failed')
  }

  const data = await res.json()

  // Soms krijg je wel JSON maar zonder item
  if (!data || !data.item) return null

  return data
}
