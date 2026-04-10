'use client'
import { forwardRef } from 'react'
import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
import { ArrowRight } from 'lucide-react'
import { CardWrapper } from '@/components'
import Link from 'next/link'
import Image from 'next/image'

const getClassName = getClassNameFactory('Stack', styles)

interface StackProps {
  data: {
    glowColor?: string
    glowIntensity?: number
    borderRadius?: number
    waves?: boolean
  }
}

const myStack = [
  {
    name: 'ReactJS',
    description: 'React, NextJS',
    image: '/0a7c9e4d1b3f6a2c.png',
  },
  {
    name: 'Wordpress',
    description: 'Platform',
    image: '/4c1e8a7d2f9b3c6e.png',
  },
  {
    name: 'Docker',
    description: 'Containers',
    image: '/6b2d9f1a4c7e3d8f.png',
  },
  {
    name: 'Sass',
    description: 'Styling Language',
    image: '/3e8a1d6c9b2f4a7d.png',
  },
  {
    name: 'Git',
    description: 'Git, Github, Gitea',
    image: '/8d4c1f7a2e9b6c3d.png',
  },
  {
    name: 'VueJS',
    description: 'Framework',
    image: '/2f7b4d8c1a6e9d3b.png',
  },
]

const Stack = forwardRef<React.ElementRef<typeof CardWrapper>, StackProps>(
  ({ data }, ref) => {
    return (
      <CardWrapper ref={ref} data={data}>
        <div className={getClassName()}>
          <div className={getClassName('nav')}>
            <h2>Stack</h2>
            <Link href="/stack" className={getClassName('nav-button')}>
              Full Stack
              <ArrowRight />
            </Link>
          </div>

          <div className={getClassName('body')}>
            {myStack.map((item, index) => (
              <div key={index} className={getClassName('body-item')}>
                <div className={getClassName('body-item-left')}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={38}
                    height={38}
                  />
                </div>
                <div className={getClassName('body-item-right')}>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardWrapper>
    )
  },
)

Stack.displayName = 'Stack'
export default Stack
