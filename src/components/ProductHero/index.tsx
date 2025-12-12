'use client'
import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
const getClassName = getClassNameFactory('ProductHero', styles)
import Link from 'next/link'

const ProductHero = () => {
  return (
    <div className={getClassName()}>
      <p className={getClassName('subtitle')}>Used by <span>10.000+ apps</span></p>
      <div className={getClassName('title')}>
        <p className={getClassName('title_top')}>Bring your app alive </p>
        <div className={getClassName('title_bot')}>
          <p>with the</p>
          <div className={getClassName('title_bot-svg')}>
          </div>
          <p>Analize Api</p>
        </div>
      </div>
      <p className={getClassName('description')}>
        Bring your app alife with a <span>spotify Api</span> alternative. Get <span>analized song data</span>
      </p>
      <Link href="/register" className={getClassName('button')}>Get the beta</Link>
    </div>
  )
}

export default ProductHero
