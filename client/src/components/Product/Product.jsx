import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./Product.module.scss"
import ProductShortcut from "../ProductShortcut/ProductShortcut"

const Product = ({product}) => {
  const [isHovered, setIsHovered] = useState(false)

  const productCategory = product?.attributes.categories.data[0].attributes.category_name
  const productName = product?.attributes.product_name

  return(
    <Link 
      to={`/produkty/${productCategory.toLowerCase()}/${productName.replace(/\s+/g, "-").toLowerCase()}`}
      className={styles.product}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 1}}
        viewport={{ once: true }}
        className={styles.animatedDiv}
      >
        <div className={styles.productHeader}>
          <img 
            src={isHovered ? import.meta.env.VITE_APP_UPLOAD_URL + product?.attributes.product_img2.data.attributes.url : import.meta.env.VITE_APP_UPLOAD_URL + product?.attributes.product_img1.data.attributes.url}
            alt={isHovered ? product?.attributes.product_img2.data.attributes.alternativeText : product?.attributes.product_img1.data.attributes.alternativeText}
          ></img>
          {isHovered  && <ProductShortcut product={product}></ProductShortcut>}
        </div>
        <div className={styles.productInfo}>
          <p>{product?.attributes.product_name}</p>
          <p>{product?.attributes.product_price} zł</p>
        </div>
      </motion.div>
    </Link>
  )
}

export default Product