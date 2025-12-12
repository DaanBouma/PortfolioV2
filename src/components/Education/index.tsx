import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
const getClassName = getClassNameFactory('Education', styles)
import { GraduationCap } from 'lucide-react'


const myEducation = [
  {
    name: 'VMBO-TL',
    icon: <GraduationCap />,
    subtitle: 'Woldendorp, Groningen'
  },
  {
    name: 'MBO Software Development',
    icon: <GraduationCap />,
    subtitle: 'Alfa-College Groningen'
  },
]

const Education = () => {
  return (
    <div className={getClassName()}>
      <div className={getClassName('nav')}>
        <h2>Education</h2>
      </div>
      <div className={getClassName('body')}>
        {myEducation.map((item, index) => (
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
            {index !== myEducation.length - 1 && (
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

export default Education
