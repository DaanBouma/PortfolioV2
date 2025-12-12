'use client'
import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
const getClassName = getClassNameFactory('ProductBullet', styles)
import { Check } from 'lucide-react'
import Link from 'next/link'

const BulletPoint = ({ text }: any) => {
  return (
    <div className={getClassName('BulletPoint')}>
      <div className={getClassName('BulletPoint-icon')}>
        <Check />
      </div>
      <p className={getClassName('BulletPoint-text')}>
        {text}
      </p>
    </div>
  )
}

const ProductBullet = () => {
  return (
    <div className={getClassName()}>
      <div className={getClassName('nav')}>
        <p className={getClassName('nav-title')}>This is what the api gives you</p>
        <p className={getClassName('nav-subtitle')}>Powered by magic, delivered by API</p>
      </div>
      <div className={getClassName('body')}>
        <BulletPoint text="Spotify ID" />
        <BulletPoint text="Song Title" />
        <BulletPoint text="Song Artist" />
        <BulletPoint text="Pitch Frames" />
        <BulletPoint text="Album Image" />
        <BulletPoint text="Progress in ms" />
        <BulletPoint text="BTM" />
        <BulletPoint text="Song Duration" />
        <BulletPoint text="Frequency" />
      </div>
      <Link href="/register" className={getClassName('button')}>Give it a try</Link>
    </div>
  )
}

export default ProductBullet
