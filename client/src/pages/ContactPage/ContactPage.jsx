import styles from "./ContactPage.module.scss"

const ContactPage = () => {
  return(
    <div className={styles.contactPage}>
      <div className={styles.contactPageContent}>
        <h1>Kontakt</h1>
        <div className={styles.contactPageContentTop}>
          <div>
            <p>adres</p>
            <p>9606 North MoPac Expressway Suite 700 Austin, TX 78759</p>
          </div>
          <div>
            <p>nr telefonu</p>
            <p>+1 248-785-8545</p>
          </div>
          <div>
            <p>email</p>
            <p>shop@gmail.com</p>
          </div>
        </div>
        <div className={styles.contactPageContentBottom}>
          <div>
            <p>Marketing</p>
            <p>Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore ut eniam</p>
            <p>shop@gmail.com</p>
          </div>
          <div>
            <p>Kariery</p>
            <p>Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore ut eniam</p>
            <p>shop@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage