'use client'
import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
const getClassName = getClassNameFactory('ProductAbout', styles)
import Link from 'next/link'

const ProductAbout = () => {
  return (
    <div className={getClassName()}>
      <div className={getClassName('nav')}>
        <p className={getClassName('nav-title')}>Deeper song analysis on songs </p>
        <p className={getClassName('nav-subtitle')}>Never been this precise</p>
      </div>
      <p className={getClassName('description')}>Normally, when you call the Spotify API, you only get basic information. I needed <span>deeper song analysis</span>, so I created this API. It gives you pitch data (Hz) for <span>every 1/100 of a second</span>. This level of precision lets you build advanced platforms and products where your website can <span>react directly to the music</span>.</p>
      <Link href="/register" className={getClassName('button')}>Get the beta</Link>
    </div>
  )
}

export default ProductAbout
