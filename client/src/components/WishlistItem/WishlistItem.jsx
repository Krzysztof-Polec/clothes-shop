import styles from "./WishlistItem.module.scss"

const WishlistItem = ({ data }) => {
  const imgSrc = data.attributes.product_img1.data.attributes.url
  const imgAlt = data.attributes.product_img1.data.attributes.alternativeText
  const productName = data.attributes.product_name

  return(
    <div className={styles.wishlistItem}>
      <img src={`${import.meta.env.VITE_APP_UPLOAD_URL}${imgSrc}`} alt={imgAlt}></img>
      <p>{productName}</p>
    </div>
  )
}

export default WishlistItem