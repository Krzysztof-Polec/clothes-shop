import styles from "./PageHeader.module.scss"
import Nav from "../Nav/Nav"

const PageHeader = () => {
  return(
    <header className={`${styles.pageHeader} ${styles.homeHeader}`}>
      <Nav></Nav>
    </header>
  )
}

export default PageHeader