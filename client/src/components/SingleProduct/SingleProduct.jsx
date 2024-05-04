import { useState, useEffect} from "react"
import productaddtocart from "../../icons/white-shopping-cart.svg"
import heart from "../../icons/heart.svg"
import styles from "./SingleProduct.module.scss"
import Loading from "../Loading/Loading"

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

  useEffect(() => {
    const fetchData = async () => {
      try{
        const selectedImage = data[0]?.attributes.product_img1?.data
        const imageSrc = selectedImage?.attributes.url
          ? import.meta.env.VITE_APP_UPLOAD_URL + selectedImage.attributes.url
          : ""

        setSelectedImg({
          index: 0,
          src: imageSrc,
          alt: selectedImage?.attributes.alternativeText || ""
        })

        setLoading(false)
      } catch(error){
        console.error(error)
        setLoading(false)
      }
    };

    fetchData()
  }, [data])

  if(loading){
    return <Loading></Loading>
  }

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
          <div className={styles.productAddToCart}>
            <img src={productaddtocart} alt="add to cart"></img>
            <p>Dodaj do koszyka</p>
          </div>
          <div className={styles.productAddToWishlist}>
            <img src={heart} alt="add to wishlist"></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct