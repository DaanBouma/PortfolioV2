'use client'
import { useRef, useEffect, useState } from 'react'
import { AppProvider, useAppContext } from '@/hooks/AppProvider'
import { InitSpotifyService } from '@/util/initSpotifyService'
import { Nav, Spotify, Stack, Contact, Project, CardWrapper, Testimonials, AnimatedBlock, Controller } from '@/components'

// Styling / Animations
import styles from './styles.module.css'
import useLenis from '@/hooks/useLenis'
import getClassNameFactory from '@/lib/get-class-name-factory'
const getClassName = getClassNameFactory('Page', styles)
import { saveRecording } from '@/app/actions/saveRecording'

function PageContent() {
  const spotifyRef = useRef<React.ComponentRef<typeof CardWrapper>>(null)
  const navRef = useRef<React.ComponentRef<typeof CardWrapper>>(null)
  const stackRef = useRef<React.ComponentRef<typeof CardWrapper>>(null)
  const { currentPitch, averagePitch, spotifyInfo, currentSong } = useAppContext()
  const [glowColor, setGlowColor] = useState('#424257')
  const lastTriggerRef = useRef(0)
  const cooldown = 350
  const [currentSecond, setCurrentSecond] = useState(0)
  const PITCH_ANIMATION = process.env.NEXT_PUBLIC_PITCH_ANIMATION;
  useLenis()


  useEffect(() => {
    const interval = setInterval(() => {
      if (spotifyInfo?.progressMs != null) {
        setCurrentSecond(spotifyInfo.progressMs / 1000)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [spotifyInfo])


  const runWaveSequence = async (
    sequence: { run: () => Promise<void> | void; delay: number }[]
  ) => {
    let nextStart = 0

    for (const step of sequence) {
      const now = performance.now()

      if (now < nextStart) {
        await new Promise(r => setTimeout(r, nextStart - now))
      }

      const result = step.run()

      if (result instanceof Promise) {
        await result
      }

      nextStart = performance.now() + step.delay
    }
  }

  function Compare() {
    return spotifyInfo?.title === currentSong?.title;
  }


  const triggerPitchWaves = () => {
    if (currentPitch == null || averagePitch == null) return
    if (!Compare()) return
    if (PITCH_ANIMATION == 'false') return
    const now = Date.now()
    if (now - lastTriggerRef.current < cooldown) return
    lastTriggerRef.current = now

    if (currentPitch > averagePitch) {
      runWaveSequence([
        { run: () => spotifyRef.current?.triggerPulse('tl-tr'), delay: 230 },
        { run: () => navRef.current?.triggerPulse('br-tr'), delay: -20 },
        { run: () => navRef.current?.triggerPulse('tr-tl'), delay: 170 },
        { run: () => navRef.current?.triggerPulse('tl-bl'), delay: 0 },
      ])
    } else {
      runWaveSequence([
        { run: () => spotifyRef.current?.triggerPulse('br-bl'), delay: 230 },
        { run: () => stackRef.current?.triggerPulse('tl-bl'), delay: -20 },
        { run: () => stackRef.current?.triggerPulse('bl-br'), delay: 170 },
        { run: () => stackRef.current?.triggerPulse('br-tr'), delay: 0 },
      ])
    }
  }


  useEffect(() => {
    triggerPitchWaves()
  }, [currentPitch])

  return (
    <div className={getClassName()}>
      <AnimatedBlock delay={0}>
        <Nav
          ref={navRef}
          data={{
            glowColor,
            glowIntensity: 0,
            waves: true,
          }}
        />
      </AnimatedBlock>

      <AnimatedBlock delay={0.05}>
        <Spotify
          ref={spotifyRef}
          data={{
            glowColor,
            glowIntensity: 0,
            waves: true,
          }}
        />
      </AnimatedBlock>

      <AnimatedBlock delay={0.1}>
        <Stack
          ref={stackRef}
          data={{
            glowColor,
            glowIntensity: 0,
            waves: true,
          }}
        />
      </AnimatedBlock>

      <AnimatedBlock delay={0.15}>
        <Project />
      </AnimatedBlock>

      <AnimatedBlock delay={0.2}>
        <Testimonials />
      </AnimatedBlock>

      <AnimatedBlock delay={0.25}>
        <Contact />
      </AnimatedBlock>

      {/* {currentSong && (
        <Controller
          currentSong={currentSong}
          currentSecond={currentSecond}
          onSave={saveRecording}
        />
      )} */}
    </div>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <InitSpotifyService />
      <PageContent />
    </AppProvider>
  )
}
