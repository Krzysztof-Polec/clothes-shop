import styles from "./AboutUsPage.module.scss"

const AboutUs = () => {
  return(
    <div className={styles.aboutUsPage}>
      <div className={styles.aboutUsPageContent}>
        <h1>O nas</h1>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse fugiat nulla pariatur.</p>
        <p>
          <span>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</span>
          mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
          veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem 
          quia voluptas sit aspernatur aut odit aut fugit.
        </p>
      </div>
    </div>
  )
}

export default AboutUs