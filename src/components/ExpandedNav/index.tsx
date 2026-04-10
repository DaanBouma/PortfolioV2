import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
import { ArrowLeft, MapPin } from 'lucide-react'
const getClassName = getClassNameFactory('ExpandedNav', styles)
import Link from 'next/link'

const ExpandedNav = () => {
  return (
    <div className={getClassName()}>
      <div className={getClassName('top')}>
        <div className={getClassName('left')}>
          <div style={{ backgroundImage: 'url(/91d4e7b2c6a1f8d3.jpg)' }} />
        </div>
        <div className={getClassName('right')}>
          <div className={getClassName('label')}>
            <div />
            Beschikbaar om te praten
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
            <Link href="/" className={getClassName('footer-more')}>
              <ArrowLeft />
              Home
            </Link>
          </div>
        </div>
      </div>
      <div className={getClassName('bot')}>
        <p>Ik specialiseer mij in het maken van websites die er niet alleen goed uitzien, maar ook een optimale gebruikerservaring bieden. Bij het ontwerpen maak ik gebruik van tools en technologieën zoals WordPress en React, naast andere technieken. Wat ik het belangrijkst vind, is het voortdurend ontwikkelen van mijn vaardigheden en kennis.</p>
      </div>
    </div>
  )
}

export default ExpandedNav
