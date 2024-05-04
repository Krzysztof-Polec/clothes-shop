import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import styles from "./HamburgerMenu.module.scss"
import NavSidePanel from "../NavSidePanel/NavSidePanel"

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    if(isMenuOpen){
      setIsMenuOpen(false)
    }
  }, [location.pathname])
  
  
  return(
    <>
      <div className={`${styles.content} ${isMenuOpen ? styles.open : ""}`} onClick={handleMenuClick}>
        <div className={styles.lines}>
          <div className={`${styles.line} ${styles.line1}`}></div>
          <div className={`${styles.line} ${styles.line2}`}></div>
          <div className={`${styles.line} ${styles.line3}`}></div>
        </div>
      </div>
      {isMenuOpen && <NavSidePanel open={isMenuOpen}></NavSidePanel>}
    </> 
  )
}

export default HamburgerMenu