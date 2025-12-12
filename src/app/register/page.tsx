'use client'
import { MoveLeft } from 'lucide-react'
import { AnimatedBlock } from '@/components'
import Link from 'next/link'

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
                <div  className={getClassName('form')}>
                    <h1 className={getClassName('title')}>
                        <Link className={getClassName('title-link')} href="/product">
                            <MoveLeft />
                        </Link>
                        Join the beta
                    </h1>
                    <div className={getClassName('body')}>
                        <div className={getClassName('body-field')}>
                            <p>Email</p>
                            <input type="email" placeholder='Example@Example.com' />
                        </div>
                        <div className={getClassName('body-field')}>
                            <p>Reason</p>
                            <input type="text" placeholder='I want it because...' />
                        </div>
                        <button className={getClassName('button')}>Request</button>
                    </div>
                </div>
            </AnimatedBlock>
        </div>
    )
}

export default Page
