import { useState, useEffect } from "react"
import axios from "axios"
import styles from "./ShopPage.module.scss"
import Product from "../../components/Product/Product"
import Loading from "../../components/Loading/Loading"

const ShopPage = () => {
  const [products, setProducts] = useState([])
  const [productType, setProcutType] = useState("bestsellers")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      let filter = ""

      try{
        if(productType === "bestsellers"){
          filter = "&filters[product_isBestseller][$eq]=true"
        }else if(productType === "newProducts"){
          filter = "&filters[product_isNew][$eq]=true"
        }else if(productType === "salesProducts"){
          filter = "&filters[product_isOnSale][$eq]=true"
        }
        const response = await axios.get(import.meta.env.VITE_APP_API_URL+"/products?populate=*" + filter, {
          headers: {Authorization: "bearer " + import.meta.env.VITE_APP_API_TOKEN}
        })
        setProducts(response?.data.data)
        setLoading(false)
      }catch(err){
        console.error(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [productType])

  return(
    <main className={styles.shopPageMain}>
      <div className={styles.shopPageMainContentHeader}>
        <p onClick={()=> setProcutType("bestsellers")} className={productType === "bestsellers" ? `${styles.active}` : ""}>Bestsellers</p>
        <p onClick={()=> setProcutType("newProducts")} className={productType === "newProducts" ? `${styles.active}` : ""}>Nowości</p>
        <p onClick={()=> setProcutType("salesProducts")} className={productType === "salesProducts" ? `${styles.active}` : ""}>Wyprzedaż</p>
      </div>
      <div className={styles.shopPageMainContent}>
        {loading ? (
          <Loading></Loading>
        ) : (
          products.map(product => <Product key={product.id} product={product}></Product>)
        )}
      </div>
    </main>
  )
}

export default ShopPage