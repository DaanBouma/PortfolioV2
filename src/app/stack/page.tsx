'use client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Contact, AnimatedBlock } from '@/components'

import styles from './styles.module.css'
import getClassNameFactory from '../../lib/get-class-name-factory'
const getClassName = getClassNameFactory('Page', styles)
import useLenis from '@/hooks/useLenis'

const myProject = [
  {
    name: 'ReactJS / NextJS',
    description: 'React is het hoofdframework waarmee ik webapplicaties ontwikkel. Het biedt veel mogelijkheden. Door diverse applicaties te bouwen heb ik uitgebreide kennis opgedaan over beveiliging en het opzetten van websites.',
    image: '/react.png',
    subtitle: 'Frontend Framework'
  },
  {
    name: 'WordPress',
    description: 'Mijn mening over WordPress is volledig veranderd sinds ik ermee werk. Het biedt klanten eenvoudige methoden om hun website aan te passen. Ondanks verbeterpunten is het een sterke optie voor webdevelopment.',
    image: '/wordpress.png',
    subtitle: 'CMS Platform'
  },
  {
    name: 'Docker',
    description: 'Hoewel ik Docker niet prettig vind om mee te werken, is het wel handig. Het verdeelt het werk in containers, waardoor websites overzichtelijk en gescheiden blijven.',
    image: '/docker.png',
    subtitle: 'Containerization'
  },
  {
    name: 'Sass',
    description: 'Sass maakt het eenvoudiger om websites te stijlen. Met de juiste kennis biedt het veel flexibiliteit en mogelijkheden.',
    image: '/sass.png',
    subtitle: 'Styling Language'
  },
  {
    name: 'Git / GitHub / Gitea',
    description: 'Git is een essentiële tool om werk veilig op te slaan en te beheren. Ik heb mij gericht op Git, Gitea en GitHub.',
    image: '/git.png',
    subtitle: 'Version Control'
  },
  {
    name: 'VueJS',
    description: 'Hoewel ik nog niet extreem veel ervaring heb met Vue, vind ik het een prettige oplossing voor webproblemen. Mijn kennis is voldoende om goed wegwijs te zijn binnen het framework.',
    image: '/vue.png',
    subtitle: 'Frontend Framework'
  },
]

const Page = () => {
  useLenis()

  return (
    <div className={getClassName('Page')}>
      <AnimatedBlock delay={0}>
        <div className={getClassName()}>
          <div className={getClassName('nav')}>
            <h2>Stack</h2>
            <Link href="/" className={getClassName('nav-button')}>
              <ArrowLeft />
              Home
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
      </AnimatedBlock>

      <AnimatedBlock delay={0.05}>
        <Contact />
      </AnimatedBlock>
    </div>
  )
}

export default Page
