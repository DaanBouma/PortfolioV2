'use client'
import Image from 'next/image'
import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
const getClassName = getClassNameFactory('Testimonials', styles)

const myTestimonials = [
  {
    name: 'Julian Hessels',
    description:
      'Daan kan supergoed zelfstandig werken. Je legt een opdracht bij hem neer, geeft ’m een warme chocolademelk, en voor je het weet heeft hij het al gebouwd. Hij denkt gelijk mee over verschillende schermformaten en zorgt dat het er altijd strak en gelikt uitziet. Wat mij betreft echt een ideale collega',
    image: '/2c9d4a7e1b6f3d8a.png',
    subtitle: 'Front-end developer',
  },
  {
    name: 'Jasper Mulder',
    description:
      'Daan is een gedreven ontwikkelaar met een hands-on mentaliteit. Hij pakt problemen praktisch aan en weet altijd passende oplossingen te vinden voor complexe uitdagingen. Daan is geen ja-knikker: hij denkt pro-actief mee, stelt sterke vragen en draagt waardevolle ideeën aan om het resultaat naar een hoger niveau te tillen. Het was een plezier om met hem samen te werken!',
    image: '/8a3e1d6f4c9b2d7e.png',
    subtitle: 'Eigenaar & developer',
  },
]

const Testimonials = () => {
  return (
    <div className={getClassName()}>
      <div className={getClassName('nav')}>
        <h2>Testimonials</h2>
      </div>

      <div className={getClassName('body')}>
        {myTestimonials.map((item, index) => (
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

export default Testimonials
