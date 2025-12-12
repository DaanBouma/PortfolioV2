'use client'
import { ProductHero, ProductAbout, ProductRefer, ProductFooter, ProductBullet, AnimatedBlock } from '@/components'

// Styles / Animations
import styles from './styles.module.css'
import getClassNameFactory from '../../lib/get-class-name-factory'
const getClassName = getClassNameFactory('Page', styles)
import useLenis from '@/hooks/useLenis'

const Page = () => {
  useLenis()

  return (
    <div className={getClassName()}>
      <AnimatedBlock delay={0.05}>
        <ProductHero />
      </AnimatedBlock>
      <AnimatedBlock delay={0.1}>
        <ProductBullet />
      </AnimatedBlock>
      <AnimatedBlock delay={0.15}>
        <ProductAbout />
      </AnimatedBlock>
      <AnimatedBlock delay={0.2}>
        <ProductRefer />
      </AnimatedBlock>
      <AnimatedBlock delay={0.25}>
        <ProductFooter />
      </AnimatedBlock>
    </div>
  )
}

export default Page
