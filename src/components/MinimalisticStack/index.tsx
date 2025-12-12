'use client'
import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
import { ArrowRight } from 'lucide-react'
const getClassName = getClassNameFactory('MinimalisticStack', styles)
import Link from 'next/link'

const MinimalisticStack = () => {
  return (
    <div className={getClassName()}>
      <div className={getClassName('nav')}>
        <h2>Stack</h2>
        <Link href="/stack" className={getClassName('nav-button')}>
          Full stack
          <ArrowRight />
        </Link>
      </div>
      <div className={getClassName('body')}>
        <p>In de jaren dat ik nu bezig ben met webdevelopment, heb ik veel geleerd. Zo heb ik ervaring opgedaan met WordPress en langere tijd gewerkt met React. Daarnaast heb ik ook met diverse andere tools en frameworks gewerkt.</p>
      </div>
    </div>
  )
}

export default MinimalisticStack
