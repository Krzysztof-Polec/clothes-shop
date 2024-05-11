import { useState, useEffect } from "react"
import axios from "axios"
import Product from "../../components/Product/Product"
import styles from "./SearchPage.module.scss"
import Loading from "../../components/Loading/Loading"

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(import.meta.env.VITE_APP_API_URL+`/products?populate=*&filters[product_name][$contains]=${searchTerm}`, {
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
  }, [searchTerm])

  const handleResetSearchInput = () => setSearchTerm("")

  return(
    <div className={styles.searchPage}>
      <div className={styles.searchPageSearchInputContainer}>
        <div className={styles.searchPageSearchInput}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 
              12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 
              93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            />
          </svg>
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="szukaj"></input>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" onClick={handleResetSearchInput}>
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 
              0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 
              45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 
              45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 
              0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </div>
      </div>
      <div className={styles.searchPageMainContent}>
        {loading ? <Loading></Loading> : products.map(product => <Product key={product.id} product={product}></Product>)}
      </div>
    </div>
  )
}

export default SearchPage