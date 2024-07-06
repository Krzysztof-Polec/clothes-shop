import { useEffect, useState, useContext} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { UpdateCartContext } from "../../context/UpdateCartContext"
import { useToast } from "../Toast/Toast"
import { UpdateWishlistIconContext } from "../../context/UpdateWishlistIconContext"
import { motion } from "framer-motion"
import styles from "./ProductShortcut.module.scss"
import handleAddToCart from "../../utils/handleAddToCart"
import handleAddToWishlist from "../../utils/handleAddToWishlist"

const ProductShortcut = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext)
  const { updateWishlistIcon, setUpdateWishlistIcon } = useContext(UpdateWishlistIconContext)
  const productId = product?.id
  const productPrice = product?.attributes.product_price
  const jwt = sessionStorage.getItem("jwt")
  const user = JSON.parse(sessionStorage.getItem("user"))

  useEffect(() => {
    const fetchData = async () => {
      if(!jwt) return 
      
      try{
        const wishlistResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user-wishlists?filters[userId][$eq]=${user.id}&populate=products`, {
          headers: {Authorization: `Bearer ${jwt}`}
        })
  
        const wishlist = wishlistResponse.data.data
  
        const existingWishlistItem = wishlist.find(userWishlist => userWishlist.attributes.products.data.some(product => product.id === productId))
  
        setIsInWishlist(existingWishlistItem !== undefined)
      }catch(error){
        console.log(error)
      }
    }
  
    fetchData()
  }, [productId, jwt, updateWishlistIcon])

  return(
    <motion.div className={styles.shopPageProductShortcut}
      animate={{ bottom: 0 }}
      transition={{ duration: 0.1 }}
    >
      <div onClick={(e) => {
        e.preventDefault()
        handleAddToCart({productId, productAmount: 1, productPrice, updateCart, setUpdateCart, navigate, showToast})
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path
            d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 
            50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 
            19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 
            54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1
            1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
        </svg>
      </div>
      <div onClick={(e) => {
        e.preventDefault()
        handleAddToWishlist({productId, navigate, showToast, updateWishlistIcon, setUpdateWishlistIcon})
      }}
      className={isInWishlist ? styles.inWishlist : ""}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path opacity="1" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 
            10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 
            36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 
            0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
        </svg>
      </div>
    </motion.div>
  )
}

export default ProductShortcut