import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Footer.module.scss"
import facebookImage from "../../icons/facebook.svg"
import instagramImage from "../../icons/instagram.svg"
import twitterImage from "../../icons/twitter.svg"

const Footer = () => {
  const [emailAddress, setEmailAddress] = useState("")

  const handleEmailAddressChange = (e) => {
    const value = e.target.value
    setEmailAddress(value)
  }

  const handleNewsletterSubmit = () => {
    setEmailAddress("")
  }

  return(
    <footer className={styles.footerContent}>
      <div className={styles.newsletter}>
        <p>Newsletter</p>
        <p>Zapisz się do newslettera</p>
        <div>
          <input type="email" value={emailAddress} onChange={handleEmailAddressChange} placeholder="wpisz swój email"></input>
          <button onClick={handleNewsletterSubmit}>Subskrybuj</button>
        </div>
      </div>
      <div className={styles.footerBottomContent}>
        <div className={styles.footerLeftPanel}>
          <p>©SHOP</p>
          <Link to={"/kontakt"}>
            <p>Kontakt</p>
          </Link>
          <Link to={"/o-nas"}>
            <p>O nas</p>
          </Link>
        </div>
        <div className={styles.footerRightPanel}>
          <Link to={"https://facebook.com"}>
            <img src={facebookImage} alt="facebook"></img>
          </Link>
          <Link to={"https://instagram.com"}>
            <img src={instagramImage} alt="instagram"></img>
          </Link>
          <Link to={"https://twitter.com"}>
            <img src={twitterImage} alt="twitter"></img>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer