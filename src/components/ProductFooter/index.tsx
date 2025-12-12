'use client'
import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
const getClassName = getClassNameFactory('ProductFooter', styles)
import Link from 'next/link'

const ProductFooter = () => {
    return (
        <div className={getClassName()}>
          <h2 className={getClassName('title')}>Get the demo now</h2>
          <Link href="/register" className={getClassName('button')}>
            Get the beta
          </Link>
        </div>
    )
}

export default ProductFooter
