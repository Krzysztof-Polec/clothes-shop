import { useLocation } from "react-router-dom"
import styles from "./PageHeader.module.scss"
import Nav from "../Nav/Nav"

const PageHeader = () => {
  const location = useLocation()

  const headerClassName = () => {
    if(location.pathname === "/"){
      return styles.homeHeader
    }else if(location.pathname === "/produkty"){
      return styles.productsHeader
    }else{
      return styles.basicHeader
    }
  }

  return(
    <header className={`${styles.pageHeader} ${headerClassName()}`}>
      <Nav></Nav>
    </header>
  )
}

export default PageHeader