import styles from './styles.module.css'
import getClassNameFactory from '@/lib/get-class-name-factory'
const getClassName = getClassNameFactory('Contact', styles)

export const Contact = () => {
  return (
    <>
      <div className={getClassName()}>
        <div className={getClassName('top')}>
          <h2>Contact</h2>
          <p>Heb je nog vragen? Laat het gerust weten!</p>
        </div>
        <form className={getClassName('bot')} action="https://formspree.io/f/xbdpvzbo" method="POST" data-np-autofill-form-type="identity" data-np-checked="1" data-np-watching="1">
          <div className={getClassName('bot-group')}>
            <p className={getClassName('bot-group-label')}>Naam</p>
            <input required type="text" id="name" className={getClassName('bot-group-input')} placeholder="Jouw naam" name="name" data-np-uid="9d7acf73-7428-4599-ab88-5b6c484a04a2" data-np-intersection-state="visible" data-np-autofill-field-type="fullName"></input>
          </div>
          <div className={getClassName('bot-group')}>
            <p className={getClassName('bot-group-label')}>E-mail</p>
            <input required type="email" id="email" className={getClassName('bot-group-input')} placeholder="jouw@email.com" name="email" data-np-uid="886c6552-a1d0-4dfd-ac98-dc9e125fc2ad" data-np-intersection-state="visible" data-np-autofill-field-type="email"></input>
          </div>
          <div className={getClassName('bot-group')}>
            <p className={getClassName('bot-group-label')}>Onderwerp</p>
            <input required type="text" id="subject" className={getClassName('bot-group-input')} placeholder="Waar gaat het over?" name="subject" data-np-intersection-state="visible"></input>
          </div>
          <div className={getClassName('bot-group')}>
            <p className={getClassName('bot-group-label')}>Onderwerp</p>
            <textarea required id="message" name="message" rows={5} className={getClassName('bot-group-textarea')} placeholder="Zet je bericht hier"></textarea>
          </div>
          <button type="submit" className={getClassName('bot-group-sendbutton')}>Vesturen</button>
        </form>
      </div>
    </>
  )
}

export default Contact;
