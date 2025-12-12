"use client"
import { ExpandedNav, Experience, Education, Contact, MinimalisticStack, AnimatedBlock } from '@/components'

// Styles / Animations
import useLenis from '@/hooks/useLenis'
import getClassNameFactory from '@/lib/get-class-name-factory'
import styles from './styles.module.css'
const getClassName = getClassNameFactory('Page', styles)

export default function Page() {
  useLenis()

  return (
    <>
      <div className={getClassName()}>
        <AnimatedBlock delay={0}>
          <ExpandedNav />
        </AnimatedBlock>
        <AnimatedBlock delay={0.05}>
          <Education />
        </AnimatedBlock>
        <AnimatedBlock delay={0.1}>
          <MinimalisticStack />
        </AnimatedBlock>
        <AnimatedBlock delay={0.15}>
          <Experience />
        </AnimatedBlock>
        <AnimatedBlock delay={0.2}>
          <Contact />
        </AnimatedBlock>
      </div>
    </>
  )
}