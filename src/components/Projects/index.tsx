'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
const getClassName = getClassNameFactory('Project', styles)

const myProject = [
  {
    name: 'FC-Groningen',
    description:
      'Ik heb veel gewerkt voor bedrijven zoals FC Groningen, waarbij ik heb meegewerkt aan de webshop en de website.',
    image: '/5a1d8e3c7b2f9d4a.png',
    subtitle: 'Wordpress Website',
  },
  {
    name: 'Promotiedagen',
    description:
      'In dit project heb ik mijn kennis van React gecombineerd met WordPress. Ik heb daarbij verschillende grote bugs opgelost, waaronder problemen met het betalen van “stands” en de berekening van de totale prijs.',
    image: '/9c3f1a7d4e8b2c6f.png',
    subtitle: 'Wordpress Website',
  },
]

const Project = () => {
  return (
    <div className={getClassName()}>
      <div className={getClassName('nav')}>
        <h2>Project</h2>
        <Link href="/projects" className={getClassName('nav-button')}>
          All Projects
          <ArrowRight />
        </Link>
      </div>

      <div className={getClassName('body')}>
        {myProject.map((item, index) => (
          <div key={index} className={getClassName('body-item')}>
            <div className={getClassName('body-item-top')}>
              <div className={getClassName('body-item-top-left')}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={42}
                  height={42}
                />
              </div>
              <div className={getClassName('body-item-top-right')}>
                <h2>{item.name}</h2>
                <p>{item.subtitle}</p>
              </div>
            </div>

            <div className={getClassName('body-item-bot')}>
              <div className={getClassName('body-item-bot-left')}>
                <div /><div /><div /><div /><div /><div />
              </div>
              <div className={getClassName('body-item-bot-right')}>
                <p className={getClassName('body-item-bot-right-text')}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Project
