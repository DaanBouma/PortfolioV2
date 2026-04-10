'use client'
import { Nav, Stack, Contact, Project, Testimonials, AnimatedBlock } from '@/components'

// Styling / Animations
import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
const getClassName = getClassNameFactory('Page', styles)

import useLenis from '@/hooks/useLenis'
export default function Page() {
  useLenis()
  const cardData = {
    glowColor: '#424257',
    glowIntensity: 0,
    waves: true,
  }

  return (
    <div className={getClassName()}>
      <AnimatedBlock delay={0}>
        <Nav data={cardData} />
      </AnimatedBlock>

      <AnimatedBlock delay={0.05}>
        <Stack data={cardData} />
      </AnimatedBlock>

      <AnimatedBlock delay={0.1}>
        <Project />
      </AnimatedBlock>

      <AnimatedBlock delay={0.15}>
        <Testimonials />
      </AnimatedBlock>

      <AnimatedBlock delay={0.2}>
        <Contact />
      </AnimatedBlock>
    </div>
  )
}
