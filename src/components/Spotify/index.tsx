'use client'
import { forwardRef, useEffect, useState } from 'react'
import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
import { useAppContext } from '@/hooks/AppProvider'
import formatTime from '@/lib/formatTime'
import { ArrowRight } from 'lucide-react'
import { CardWrapper } from '@/components'
const getClassName = getClassNameFactory('Spotify', styles)

interface SpotifyProps {
  data: {
    glowColor?: string
    glowIntensity?: number
    borderRadius?: number
    waves?: boolean
  }
}

const Spotify = forwardRef<React.ComponentRef<typeof CardWrapper>, SpotifyProps>(
  ({ data }, ref) => {
    const { currentSong, spotifyInfo } = useAppContext()
    const [visible, setVisible] = useState(false)
    const [fadeIn, setFadeIn] = useState(false)

    const progress = spotifyInfo?.progress_ms ?? 0
    const duration = spotifyInfo?.duration_ms ?? 0
    const progressPercent = duration ? (progress / duration) * 100 : 0

    function Compare() {
      return spotifyInfo?.title === currentSong?.title;
    }

    useEffect(() => {
      if (Compare()) {
        setVisible(true)
        const timeout = setTimeout(() => setFadeIn(true), 50)
        return () => clearTimeout(timeout)
      } else {
        setFadeIn(false)
        setVisible(false)
      }
    }, [currentSong])
    if (!Compare() && !visible) return null
    if (!Compare()) return null
    if (!currentSong) return null


    return (
      <CardWrapper ref={ref} data={data}>
        <div
          className={`${getClassName()} ${visible ? styles.visible : styles.hidden
            }`}
          style={{
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
          }}>
          {Compare() && (
            <>
              <div className={getClassName('nav')}>
                <h2>Spotify</h2>
                <button
                  className={getClassName('nav-button')}
                  onClick={() => {
                    const trackId = currentSong?.id
                    if (trackId) {
                      window.open(`spotify:track:${trackId}`, '_blank')
                    }
                  }}>
                  Luister mee
                  <ArrowRight />
                </button>
              </div>
              <div className={getClassName('body')}>
                <div className={getClassName('body-left')}>
                  <div
                    style={{
                      backgroundImage: `url(${spotifyInfo?.albumImage})`,
                    }}
                    className={getClassName('body-img')}
                  />
                </div>
                <div className={getClassName('body-right')}>
                  <h3>{currentSong?.title}</h3>
                  <p>{currentSong?.artist}</p>

                  <div className={getClassName('body-right-bar')}>
                    <div>
                      <div style={{ width: `${progressPercent}%` }} />
                    </div>
                    <p>
                      {formatTime(progress)} / {formatTime(duration)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardWrapper>
    )
  },
)

export default Spotify
