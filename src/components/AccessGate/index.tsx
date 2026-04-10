'use client'

import { useEffect } from 'react'

export default function AccessGate() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get('h')

    if (!slug) {
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
      .catch(() => {})
  }, [])

  return (
    <div
      style={{
        margin: 0,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #ffffff 0%, #f7f8fc 100%)',
        color: '#4a4d63',
        fontFamily: 'Arial, Helvetica, sans-serif',
        padding: '32px 20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '760px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '92px',
            lineHeight: 1,
            fontWeight: 500,
            letterSpacing: '-0.04em',
            color: '#55576d',
          }}
        >
          403
        </p>
        <h1
          style={{
            margin: '18px 0 8px',
            fontSize: 'clamp(28px, 4vw, 46px)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            color: '#55576d',
          }}
        >
          Access Denied / Forbidden
        </h1>
        <p
          style={{
            margin: '0 auto',
            maxWidth: '460px',
            fontSize: '18px',
            lineHeight: 1.5,
            color: '#8c90a6',
          }}
        >
          This page exists, but it is only available with a valid access session.
        </p>
      </div>
    </div>
  )
}
