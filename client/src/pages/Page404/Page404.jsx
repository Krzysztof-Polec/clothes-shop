import styles from "./Page404.module.scss"

const Page404 = () => {
  return(
    <div className={styles.page404}>
      <div className={styles.page404Content}>
        <h1>404</h1>
        <p>Strona której szukasz jest niedostępna!</p>
      </div>
    </div>
  )
}

export default Page404