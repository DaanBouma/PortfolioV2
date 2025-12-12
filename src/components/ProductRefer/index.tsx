'use client'
import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
const getClassName = getClassNameFactory('ProductRefer', styles)
import Link from 'next/link'

const ProductAbout = () => {
  return (
    <div className={getClassName()}>
      <div className={getClassName('nav')}>
        <p className={getClassName('nav-title')}>Project that uses the API</p>
        <p className={getClassName('nav-subtitle')}>Portfolio by Daan Bouma</p>
      </div>
      <p className={getClassName('description')}>This is the first project built with the API. At first glance it looks clean and minimal. But as soon as the creator starts Spotify, the entire website transforms. <span>The pulses of the song’s</span> beat travel across the cards.</p>
      <Link target='_blanc' href="/" className={getClassName('button')}>Visit DaanBouma.nl</Link>
    </div>
  )
}

export default ProductAbout
