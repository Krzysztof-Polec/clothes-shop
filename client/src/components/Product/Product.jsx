import { motion } from "framer-motion"
import styles from "./Product.module.scss"

const Product = ({product}) => {
  const productCategory = product?.attributes.categories.data[0].attributes.category_name
  const productName = product?.attributes.product_name

  return(
    <motion.a
      className={styles.shopPageProduct}
      href={`produkty/${productCategory.toLowerCase()}/${productName.replace(/\s+/g, "-").toLowerCase()}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{duration: 1}}
      viewport={{ once: true }}
    >
      <div className={styles.shopPageProductHeader}>
        <img src={import.meta.env.VITE_APP_UPLOAD_URL + product?.attributes.product_img1.data.attributes.url} alt={product?.attributes.product_img1.data.attributes.alternativeText}></img>
      </div>
      <div className={styles.shopPageProductInfo}>
        <p>{product?.attributes.product_name}</p>
        <p>{product?.attributes.product_price} zł</p>
      </div>
    </motion.a>
  )
}

export default Product