import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { UpdateCartContext } from "../../context/UpdateCartContext"
import getCartItemsAmount from "../../utils/getCartItemsAmount"
import styles from "./Nav.module.scss"
import darkShoppingCartImage from "../../icons/dark-shopping-cart.svg"
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu"
import searchImage from "../../icons/search.svg"
import accountImage from "../../icons/account.svg"

const Nav = () => {
  const [totalCartItem, setTotalCartItem] = useState(0)
  const isLogin = sessionStorage.getItem("jwt") ? true : false
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext)

  useEffect(() => {
    getCartItemsAmount({setTotalCartItem})
  }, [updateCart])  

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
        <Link to={isLogin ? "/koszyk" : "/logowanie"}>
          <img src={darkShoppingCartImage} alt="shopping-cart"></img>
          <span>{totalCartItem}</span>
        </Link>
      </div>
    </nav>
  )
}

export default Nav