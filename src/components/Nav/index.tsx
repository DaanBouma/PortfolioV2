'use client'
import { forwardRef } from 'react'
import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
import { ArrowRight, MapPin } from 'lucide-react'
import { CardWrapper } from '@/components'
import Link from 'next/link'

const getClassName = getClassNameFactory('Nav', styles)

interface NavProps {
  data: {
    glowColor?: string
    glowIntensity?: number
    borderRadius?: number
    waves?: boolean
  }
}

const Nav = forwardRef<React.ComponentRef<typeof CardWrapper>, NavProps>(
  ({ data }, ref) => {
    return (
      <CardWrapper ref={ref} data={data}>
        <div className={getClassName()}>
          <div className={getClassName('left')}>
            <div style={{ backgroundImage: 'url(/91d4e7b2c6a1f8d3.jpg)' }} />
          </div>
          <div className={getClassName('right')}>
            <div className={getClassName('label')}>
              <div />
             Werkzaam bij wpcompany
            </div>
            <h1 className={getClassName('title')}>Daan Bouma</h1>
            <p className={getClassName('description')}>
              Ik ben een gepassioneerde webdeveloper, gefocust op het verder
              ontwikkelen van innovatieve en schaalbare weboplossingen.
            </p>
            <div className={getClassName('footer')}>
              <div className={getClassName('footer-location')}>
                <MapPin />
                <p>Appingedam, Groningen</p>
              </div>
              <Link href="/about" className={getClassName('footer-more')}>
                Leer meer over mij
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </CardWrapper>
    )
  },
)

Nav.displayName = 'Nav'
export default Nav
