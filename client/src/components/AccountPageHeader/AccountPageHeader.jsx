import { Link, useNavigate } from "react-router-dom"
import styles from "./AccountPageHeader.module.scss"

const AccountPageHeader = () => {
  const navigate = useNavigate()

  const handleLogoutButtonClick = () => {
    sessionStorage.clear("user")
    sessionStorage.clear("jwt")
    navigate("/")
  }

  return(
    <div className={styles.accountPageHeader}>
      <div><Link to={"/konto"}>Panel</Link></div>
      <div><Link to={"/konto/informacje-o-koncie"}>Informacje o koncie</Link></div>
      <div><Link to={"/konto/historia-zamówień"}>Historia zamówień</Link></div>
      <div><Link to={"/konto/lista-życzeń"}>Lista życzeń</Link></div>
      <div><p onClick={handleLogoutButtonClick}>Wyloguj</p></div>
    </div>
  )
}

export default AccountPageHeader