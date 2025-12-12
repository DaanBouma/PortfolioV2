'use client'

import type React from 'react'
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { cn } from '../../lib/utils'

type Corner = 'tl' | 'tr' | 'br' | 'bl'
export type PulseRoute =
  | 'tl-tr' | 'tr-br' | 'br-bl' | 'bl-tl'
  | 'tr-tl' | 'br-tr' | 'bl-br' | 'tl-bl'
  | 'tl-br' | 'tr-bl' | 'br-tl' | 'bl-tr'
  | 'tl-tl' | 'tr-tr' | 'br-br' | 'bl-bl'

interface ActivePulse {
  id: number
  route: PulseRoute
  startTime: number
  resolve: () => void
  duration: number
}

interface BorderPulseCardProps {
  children: React.ReactNode
  className?: string
  route?: PulseRoute
  glowColor?: string
  glowIntensity?: number
  borderRadius?: number
  autoTrigger?: boolean
  autoTriggerDelay?: number
  pulseLength?: number
}

export const BorderPulseCard = forwardRef<{ triggerPulse: (route: PulseRoute) => Promise<void> }, BorderPulseCardProps>(
  (
    {
      children,
      className,
      route = 'bl-tr',
      glowColor = '#424257',
      glowIntensity = 0,
      borderRadius = 24,
      autoTrigger = false,
      autoTriggerDelay = 100000,
      pulseLength = 100,
    },
    ref,
  ) => {
    const [activePulses, setActivePulses] = useState<ActivePulse[]>([])
    const pulseIdRef = useRef(0)
    const cardRef = useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
      if (!cardRef.current) return
      const updateDimensions = () => {
        if (cardRef.current) {
          setDimensions({
            width: cardRef.current.offsetWidth,
            height: cardRef.current.offsetHeight,
          })
        }
      }
      updateDimensions()
      window.addEventListener('resize', updateDimensions)
      return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    const calculatePathLength = (route: PulseRoute, width: number, height: number, radius: number) => {
      const w = width - 3
      const h = height - 3
      const r = radius
      const quarterCircle = (Math.PI * r) / 2

      const lengths: Record<PulseRoute, number> = {
        'tl-tr': w - 2 * r + quarterCircle,
        'tr-br': h - 2 * r + quarterCircle,
        'br-bl': w - 2 * r + quarterCircle,
        'bl-tl': h - 2 * r + quarterCircle,
        'tr-tl': w - 2 * r + quarterCircle,
        'br-tr': h - 2 * r + quarterCircle,
        'bl-br': w - 2 * r + quarterCircle,
        'tl-bl': h - 2 * r + quarterCircle,
        'tl-br': w - 2 * r + h - 2 * r + 2 * quarterCircle,
        'tr-bl': h - 2 * r + w - 2 * r + 2 * quarterCircle,
        'br-tl': w - 2 * r + h - 2 * r + 2 * quarterCircle,
        'bl-tr': h - 2 * r + w - 2 * r + 2 * quarterCircle,
        'tl-tl': quarterCircle,
        'tr-tr': quarterCircle,
        'br-br': quarterCircle,
        'bl-bl': quarterCircle,
      }

      return lengths[route] ?? w
    }

    const triggerPulse = (newRoute: PulseRoute): Promise<void> => {
      return new Promise((resolve) => {
        if (dimensions.width === 0 || dimensions.height === 0) {
          resolve()
          return
        }

        const pathLength =
          calculatePathLength(newRoute, dimensions.width, dimensions.height, borderRadius)

        const speed = 300
        const distance = pathLength + pulseLength
        const smalldis = pathLength - pulseLength - pulseLength
        const duration = (distance / speed) * 1000
        const smalldur = (smalldis / speed) * 1000

        const pulseId = pulseIdRef.current++
        const newPulse: ActivePulse = {
          id: pulseId,
          route: newRoute,
          startTime: Date.now(),
          resolve,
          duration,
        }

        setActivePulses((prev) => [...prev, newPulse])

        setTimeout(() => resolve(), duration * 0.7)
      })
    }

    useImperativeHandle(ref, () => ({
      triggerPulse,
    }))

    useEffect(() => {
      if (autoTrigger) {
        const timer = setTimeout(() => {
          triggerPulse(route)
        }, autoTriggerDelay)
        return () => clearTimeout(timer)
      }
    }, [autoTrigger, autoTriggerDelay, route])

    const generatePath = (route: PulseRoute, width: number, height: number, radius: number) => {
      const strokeOffset = 1.5
      const w = width - strokeOffset * 2
      const h = height - strokeOffset * 2
      const r = radius
      const offset = strokeOffset

      const arc = (toX: number, toY: number, clockwise: boolean) => {
        const sweep = clockwise ? 1 : 0
        return `A ${r} ${r} 0 0 ${sweep} ${toX} ${toY}`
      }

      return {
        'tl-tr': `M ${offset} ${offset + r} A ${r} ${r} 0 0 1 ${offset + r} ${offset} L ${offset + w - 12} ${offset}`,
        'tr-br': `M ${offset + w} ${offset + r} L ${offset + w} ${offset + h - r} ${arc(offset + w - r, offset + h, true)}`,
        'br-bl': `M ${offset + w} ${offset + h - r} A ${r} ${r} 0 0 1 ${offset + w - r} ${offset + h} L ${offset + 12 } ${offset + h}`,
        'bl-tl': `M ${offset} ${offset + h - r} L ${offset} ${offset + r} ${arc(offset + r, offset, true)}`,
        'tr-tl': `M ${offset + w} ${offset + r} ${arc(offset + w - r, offset, false)} L ${offset + r} ${offset}`,
        'br-tr': `M ${offset + w - r} ${offset + h} ${arc(offset + w, offset + h - r, false)} L ${offset + w} ${offset + r}`,
        'bl-br': `M ${offset} ${offset + h - r} ${arc(offset + r, offset + h, false)} L ${offset + w - r} ${offset + h}`,
        'tl-bl': `M ${offset + r} ${offset} ${arc(offset, offset + r, false)} L ${offset} ${offset + h - r}`,
        'tl-br': `M ${offset + r} ${offset} L ${offset + w - r} ${offset} ${arc(offset + w, offset + r, true)} L ${offset + w} ${offset + h - r} ${arc(offset + w - r, offset + h, true)}`,
        'tr-bl': `M ${offset + w} ${offset + r} L ${offset + w} ${offset + h - r} ${arc(offset + w - r, offset + h, true)} L ${offset + r} ${offset + h} ${arc(offset, offset + h - r, true)}`,
        'br-tl': `M ${offset + w - r} ${offset + h} L ${offset + r} ${offset + h} ${arc(offset, offset + h - r, true)} L ${offset} ${offset + r} ${arc(offset + r, offset, true)}`,
        'bl-tr': `M ${offset} ${offset + h - r} L ${offset} ${offset + r} ${arc(offset + r, offset, true)} L ${offset + w - r} ${offset} ${arc(offset + w, offset + r, true)}`,
        'tl-tl': `M ${offset + r} ${offset} ${arc(offset, offset + r, false)} L ${offset + r} ${offset}`,
        'tr-tr': `M ${offset + w - r} ${offset} ${arc(offset + w, offset + r, true)} L ${offset + w - r} ${offset}`,
        'br-br': `M ${offset + w} ${offset + h - r} ${arc(offset + w - r, offset + h, false)} L ${offset + w} ${offset + h - r}`,
        'bl-bl': `M ${offset} ${offset + h - r} ${arc(offset + r, offset + h, true)} L ${offset} ${offset + h - r}`,
      }[route]
    }

    const handleAnimationEnd = (id: number) => {
      setActivePulses((prev) => prev.filter((p) => p.id !== id))
    }

    return (
      <div ref={cardRef} className={cn('relative overflow-hidden rounded-lg', className)}>
        <style>{`
          @keyframes borderPulse {
            from { stroke-dashoffset: var(--start-offset); opacity: 1; }
            to { stroke-dashoffset: var(--end-offset); opacity: 1; }
          }
        `}</style>

        {activePulses.map((pulse) => {
          if (dimensions.width === 0 || dimensions.height === 0) return null

          const path = generatePath(pulse.route, dimensions.width, dimensions.height, borderRadius)
          const pathLength =
            calculatePathLength(pulse.route, dimensions.width, dimensions.height, borderRadius)

          const dashArray = `${pulseLength} ${pathLength * 3}`
          const startOffset = 0
          const endOffset = -(pathLength + pulseLength)

          const filterId = `glow-filter-${pulse.id}`

          return (
            <svg
              key={pulse.id}
              className="pointer-events-none absolute inset-0"
              width={dimensions.width}
              height={dimensions.height}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'visible',
              }}
              onAnimationEnd={() => handleAnimationEnd(pulse.id)}
            >
              <defs>
                <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation={glowIntensity / 3} result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d={path}
                fill="none"
                stroke={glowColor}
                strokeWidth="3"
                strokeLinecap="round"
                filter={`url(#${filterId})`}
                style={{
                  strokeDasharray: dashArray,
                  strokeDashoffset: startOffset,
                  opacity: 0.9,
                  animation: `borderPulse ${pulse.duration}ms linear forwards`,
                  ['--start-offset' as any]: startOffset,
                  ['--end-offset' as any]: endOffset,
                }}
              />
            </svg>
          )
        })}

        {children}
      </div>
    )
  },
)

BorderPulseCard.displayName = 'BorderPulseCard'

interface CardData {
  glowColor?: string
  glowIntensity?: number
  borderRadius?: number
  waves?: boolean
}

interface CardWrapperProps {
  children: React.ReactNode
  data: CardData
}

export const CardWrapper = forwardRef<{ triggerPulse: (route: PulseRoute) => Promise<void> }, CardWrapperProps>(
  ({ children, data }, ref) => {
    const internalRef = useRef<{ triggerPulse: (route: PulseRoute) => Promise<void> }>(null)
    const {
      glowColor = '#424257',
      glowIntensity = 15,
      borderRadius = 12,
      waves = false,
    } = data

    useImperativeHandle(ref, () => ({
      triggerPulse: (route: PulseRoute) => {
        if (internalRef.current?.triggerPulse && waves) {
          return internalRef.current.triggerPulse(route)
        }
        return Promise.resolve()
      },
    }))

    return (
      <div className="borderpulse-container">
        <div className="card-section">
          <BorderPulseCard
            ref={internalRef}
            glowColor={glowColor}
            glowIntensity={glowIntensity}
            borderRadius={borderRadius}
            className="borderpulse-card"
            autoTrigger={false}
          >
            {children}
          </BorderPulseCard>
        </div>
      </div>
    )
  },
)

CardWrapper.displayName = 'CardWrapper'
