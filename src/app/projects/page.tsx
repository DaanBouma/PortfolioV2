'use client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Contact, AnimatedBlock } from '@/components'

import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
const getClassName = getClassNameFactory('Page', styles)
import useLenis from '@/hooks/useLenis'

const myProject = [
  {
    name: 'FC-Groningen',
    subtitle: 'Wordpress Website',
    description:
      'Dit was het project waarbij ik veel heb geleerd over WordPress. Hierbij heb ik een website nagemaakt in WordPress. Het bedrijf waarbij ik dit deed heeft ook alle websites gemaakt van FC-Groningen en zo heb ik de interne structuur geleerd van deze website.',
    image: '/fcgroningen.png',
  },
  {
    name: 'Promotiedagen',
    subtitle: 'Wordpress Website',
    description:
      'In dit project heb ik mijn kennis van React gecombineerd met WordPress. Ik heb daarbij verschillende grote bugs opgelost, waaronder problemen met het betalen van “stands” en de berekening van de totale prijs.',
    image: '/promotiedagen2.png',
  },
  {
    name: 'NZG Nationale ZorgGids',
    subtitle: 'Wordpress Website',
    description:
      'In dit project heb ik een nieuwe functionaliteit ontwikkeld voor de redactie. Hiermee kunnen zij links in hun blog plaatsen met een vervaldatum. Na deze datum is het linkje automatisch niet meer bruikbaar.',
    image: '/zorggids.png',
  },
  {
    name: 'Media Focus Point',
    subtitle: 'Wordpress Plugin',
    description:
      'Ik heb een bestaande WordPress-plugin uitgebreid, zodat er niet alleen betere focus points op foto’s gezet kunnen worden, maar nu ook op video’s. Daarnaast heb ik verschillende bugs opgelost.',
    image: '/mediafocuspoint2.png',
  },
  {
    name: 'RecruiteeConnect',
    subtitle: 'Wordpress Plugin',
    description:
      'Ik heb een WordPress-plugin ontwikkeld die een connectie legt tussen Recruitee en WordPress. Hierdoor kunnen bezoekers direct via de website solliciteren, en worden de sollicitaties automatisch naar Recruitee gestuurd.',
    image: '/recruiteeConnect.png',
  },
]

const Page = () => {
  useLenis()

  return (
    <div className={getClassName('Page')}>
      <AnimatedBlock delay={0}>
        <div className={getClassName()}>
          <div className={getClassName('nav')}>
            <h2>Projects</h2>
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
