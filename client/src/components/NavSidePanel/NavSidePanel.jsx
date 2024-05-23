import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./NavSidePanel.module.scss"
import darkShoppingCartImage from "../../icons/dark-shopping-cart.svg"
import accountImage from "../../icons/account.svg"
import searchIcon from "../../icons/search.svg"

const variants = {
  open: {x: 0 },
  closed: {x: -180 },
}

const NavSidePanel = ({open}) => {
  const isLogin = sessionStorage.getItem("jwt") ? true : false

  return(
    <motion.div 
      className={styles.navSidePanel}
      animate={open ? "open" : "closed"}
      initial={variants.closed}
      exit="closed"
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.navSidePanelContent}>
        <div>
          <Link to="/produkty">Sklep</Link>
          <Link to="/kontakt">Kontakt</Link>
          <Link to="/o-nas">O nas</Link>
        </div>
        <div>
          <Link to="/szukaj">
            <img src={searchIcon} alt="search"></img>
            <p>Szukaj</p>
          </Link>
          <Link to="/koszyk">
            <img src={darkShoppingCartImage} alt="shopping-cart"></img>
            <p>Koszyk</p>
            <p>0</p>
          </Link>
          <Link to={isLogin ? "/konto" : "/logowanie"}>
            <img src={accountImage} alt="account"></img>
            <p>Konto</p>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default NavSidePanel