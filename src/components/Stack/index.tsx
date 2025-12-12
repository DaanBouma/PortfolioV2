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
    image: '/react.png',
  },
  {
    name: 'Wordpress',
    description: 'Platform',
    image: '/wordpress.png',
  },
  {
    name: 'Docker',
    description: 'Containers',
    image: '/docker.png',
  },
  {
    name: 'Sass',
    description: 'Styling Language',
    image: '/sass.png',
  },
  {
    name: 'Git',
    description: 'Git, Github, Gitea',
    image: '/git.png',
  },
  {
    name: 'VueJS',
    description: 'Framework',
    image: '/vue.png',
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
