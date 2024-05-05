import { useLocation } from "react-router-dom"
import styles from "./PageHeader.module.scss"
import Nav from "../Nav/Nav"
import PageHeaderSlider from "../PageHeaderSlider/PageHeaderSlider"

const PageHeader = () => {
  const location = useLocation()

  const headerClassName = () => {
    if(location.pathname === "/produkty"){
      return styles.productsHeader
    }else{
      return styles.basicHeader
    }
  }

  if(location.pathname === "/"){
    return <PageHeaderSlider></PageHeaderSlider>
  }

  return(
    <header className={`${styles.pageHeader} ${headerClassName()}`}>
      <Nav></Nav>
    </header>
  )
}

export default PageHeader