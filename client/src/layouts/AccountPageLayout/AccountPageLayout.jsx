import { Outlet } from "react-router-dom"
import AccountPageHeader from "../../components/AccountPageHeader/AccountPageHeader"
import styles from "./AccountPageLayout.module.scss"

const AccountPageLayout = () => {
  return(
    <div className={styles.accountPage}>
      <AccountPageHeader></AccountPageHeader>
      <Outlet></Outlet>
    </div>
  )
}

export default AccountPageLayout