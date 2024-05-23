import { Link } from "react-router-dom"
import styles from "./Nav.module.scss"
import darkShoppingCartImage from "../../icons/dark-shopping-cart.svg"
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu"
import searchImage from "../../icons/search.svg"
import accountImage from "../../icons/account.svg"

const Nav = () => {
  const isLogin = sessionStorage.getItem("jwt") ? true : false

  return(
    <nav className={styles.navContent}>
      <div className={styles.navLeftPanel}>
        <div className={styles.navLeftPanelLinks}>
          <Link to="/produkty">Sklep</Link>
          <Link to="/kontakt">Kontakt</Link>
          <Link to="/o-nas">O nas</Link>
        </div>
        <HamburgerMenu></HamburgerMenu>
      </div>
      <div className={styles.navMiddlePanel}>
        <Link to="/">SHOP</Link>
      </div>
      <div className={styles.navRightPanel}>
        <Link to="/szukaj">
          <img src={searchImage} alt="search"></img>
        </Link>
        <Link to={isLogin ? "/konto" : "/logowanie"}>
          <img src={accountImage} alt="account"></img>
        </Link>
        <Link to="/koszyk">
          <img src={darkShoppingCartImage} alt="shopping-cart"></img>
        </Link>
      </div>
    </nav>
  )
}

export default Nav