'use client'

import { useEffect, useState } from 'react'

type GateState = 'checking' | 'blocked'

export default function AccessGate() {
  const [state, setState] = useState<GateState>('checking')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get('h')

    if (!slug) {
      setState('blocked')
      return
    }

    fetch(`/api/access?h=${encodeURIComponent(slug)}`, {
      method: 'GET',
      credentials: 'same-origin',
      cache: 'no-store',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Access denied')
        }

        params.delete('h')
        const nextSearch = params.toString()
        const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}`
        window.history.replaceState({}, '', nextUrl)
        window.location.reload()
      })
      .catch(() => {
        setState('blocked')
      })
  }, [])

  return (
    <div
      style={{
        margin: 0,
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#0c0c10',
        color: '#f5f5f5',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>403</h1>
        <p style={{ marginTop: '12px', opacity: 0.72 }}>
          {state === 'checking' ? 'Checking access...' : 'Access denied'}
        </p>
      </div>
    </div>
  )
}
