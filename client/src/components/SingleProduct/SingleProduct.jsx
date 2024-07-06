import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useToast } from "../Toast/Toast"
import { UpdateCartContext } from "../../context/UpdateCartContext"
import { UpdateWishlistIconContext } from "../../context/UpdateWishlistIconContext"
import styles from "./SingleProduct.module.scss"
import Loading from "../Loading/Loading"
import handleAddToCart from "../../utils/handleAddToCart"
import handleAddToWishlist from "../../utils/handleAddToWishlist"
import addToCartIcon from "../../icons/white-shopping-cart.svg"

const SingleProduct = ({data}) => {
  const [productAmount, setProductAmount] = useState(1)
  const [selectedImg, setSelectedImg] = useState(
    {
      index: 0,
      src: "",
      alt: ""
    }
  )
  const [loading, setLoading] = useState(true)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext)
  const { updateWishlistIcon, setUpdateWishlistIcon } = useContext(UpdateWishlistIconContext)
  const navigate = useNavigate()
  const { showToast } = useToast()
  const jwt = sessionStorage.getItem("jwt")
  const user = JSON.parse(sessionStorage.getItem("user"))

  const productId = data[0]?.id

  useEffect(() => {
    try{
      const selectedImage = data[0]?.attributes.product_img1?.data
      const imageSrc = selectedImage?.attributes.url ? import.meta.env.VITE_APP_UPLOAD_URL + selectedImage.attributes.url : ""

      setSelectedImg({
        index: 0,
        src: imageSrc,
        alt: selectedImage?.attributes.alternativeText || ""
      })

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
      setLoading(false)
    }catch(error){
      console.error(error)
      setLoading(false)
    }
  }, [data, updateWishlistIcon])

  if(loading) return <Loading></Loading>

  const productTittle = data[0]?.attributes.product_name
  const productDescription = data[0]?.attributes.product_description
  const productPrice = data[0]?.attributes.product_price
  const productCategory = data[0]?.attributes.categories.data[0].attributes.category_name

  const handleProductAmountChange = (e) => {
    const amount = e.target.value
    amount > 0 ? setProductAmount(amount) : setProductAmount(1)
  }

  const handleAddOneAmount = () => setProductAmount(productAmount + 1)
  
  const handleRemoveOneAmount = () => {
    if(productAmount > 1) setProductAmount(productAmount - 1)
  }

  const handleSelectBigImage = (index) => {
    const selectedImage = data[0]?.attributes[`product_img${index + 1}`]?.data

    if(selectedImage){
      setSelectedImg({
        index: index,
        src: import.meta.env.VITE_APP_UPLOAD_URL + selectedImage.attributes.url,
        alt: selectedImage.attributes.alternativeText,
      })
    }
  }

  return(
    <div className={styles.singleProduct}>
      <div className={styles.singleProductLeftPanel}>
        {selectedImg && <img src={selectedImg.src} alt={selectedImg.alt} className={styles.productMainImage}></img>}
        <div className={styles.productChangeImage}>
        {Array.from({ length: 3 }).map((_, index) => (
          <img
            key={index}
            src={import.meta.env.VITE_APP_UPLOAD_URL + data[0]?.attributes[`product_img${index + 1}`]?.data.attributes.url}
            alt={data[0]?.attributes[`product_img${index + 1}`]?.data.attributes.alternativeText}
            onClick={() => handleSelectBigImage(index)}
            className={selectedImg.index === index ? `${styles.active}` : ""}
          />
          ))}
        </div>
      </div>
      <div className={styles.singleProductRightPanel}>
        <div className={styles.productInfo}>
          <p className={styles.productTittle}>{productTittle}</p>
          <p className={styles.productDescription}>{productDescription}</p>
          <p className={styles.productPrice}>{productPrice} zł</p>
          <p className={styles.productCategory}>KATEGORIA: <span>{productCategory}</span></p>
        </div>
        <div className={styles.productButtons}>
          <div className={styles.productAddToCartAmount}>
           <p onClick={handleRemoveOneAmount}>-</p>
           <input type="number" value={productAmount} onChange={handleProductAmountChange} min="1"></input>
           <p onClick={handleAddOneAmount}>+</p> 
          </div>
          <div className={styles.productAddToCart} onClick={()=> handleAddToCart({productId, productAmount, productPrice, updateCart, setUpdateCart, navigate, showToast})}>
            <img src={addToCartIcon} alt="add to cart"></img>
            <p>Dodaj do koszyka</p>
          </div>
          <div className={`${styles.productAddToWishlist} ${isInWishlist ? styles.inWishlist : ""}`} onClick={() => handleAddToWishlist({productId, navigate, showToast, updateWishlistIcon, setUpdateWishlistIcon})}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path opacity="1" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 
                10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 
                36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 
                0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct