import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
import { Store, Paintbrush } from 'lucide-react'

const getClassName = getClassNameFactory('Experience', styles)

const myExperience = [
  {
    name: 'Albertheijn Bakkerij',
    icon: <Store />,
    subtitle: 'Appingedam 2023-2025'
  },
  {
    name: 'Front-end Developer',
    icon: <Paintbrush />,
    subtitle: 'WP-Company 2025 - Nu'
  },
]

const Experience = () => {
  return (
    <div className={getClassName()}>
      <div className={getClassName('nav')}>
        <h2>Experience</h2>
      </div>
      <div className={getClassName('body')}>
        {myExperience.map((item, index) => (
          <div key={item.name} className={getClassName('wrapper')}>
            <div className={getClassName('body-item')}>
              <div className={getClassName('body-item-top')}>
                <div className={getClassName('body-item-top-left')}>
                  <div className={getClassName('body-item-top-left-icon')}>
                    {item.icon}
                  </div>
                </div>
                <div className={getClassName('body-item-top-right')}>
                  <h2>{item.name}</h2>
                  <p>{item.subtitle}</p>
                </div>
              </div>
            </div>
            {index !== myExperience.length - 1 && (
              <div className={getClassName('body-dots')}>
                <div className={getClassName('body-dot')}>
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience
