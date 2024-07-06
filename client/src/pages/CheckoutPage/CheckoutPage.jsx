import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm"
import styles from "./CheckoutPage.module.scss"
import Loading from "../../components/Loading/Loading"
import CheckoutOrderItem from "../../components/CheckoutOrderItem/CheckoutOrderItem"

const CheckoutPage = () => {
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState([])
  const [loading, setLoading] = useState(true)
  const jwt = sessionStorage.getItem("jwt")
  const user = JSON.parse(sessionStorage.getItem("user"))
  const navigate = useNavigate()

  useEffect(() => {
    const getCartItems = async () => {
      if(!jwt){
        navigate("/logowanie")
        return
      }

      await axios.get(`${import.meta.env.VITE_APP_API_URL}/user-carts?[populate][products][populate][product_img1][populate][0]=url&filters[userId][$eq]=${user.id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then(response => {
        const data = response.data?.data
        const cartItemsList = data.map((item, index) => ({
          product_name: item.attributes.products?.data[0].attributes.product_name,
          amount: item.attributes.amount,
          price: item.attributes.price,
          image: item.attributes.products?.data[0].attributes.product_img1.data.attributes.url,
          imageAlt: item.attributes.products?.data[0].attributes.product_img1.data.attributes.alternativeText,
        }))
        setCart(cartItemsList)
        setLoading(false)
        console.log(cartItemsList)
      }).catch(err => {
        console.log(err)
        setLoading(false)
      })
    }
    getCartItems()
  },[jwt])

  useEffect(() => {
    const totalPrice = cart.reduce((total, product) => total + product.price, 0)
    setTotalPrice(totalPrice)
  }, [cart])

  if(loading) return <Loading></Loading>

  return(
    <div className={styles.checkoutPage}>
      <div className={styles.checkoutPageHeader}>
        <p>Podsumowanie</p>
      </div>
      <div className={styles.checkoutPageContent}>
        <CheckoutForm></CheckoutForm>
        <div className={styles.checkoutPageContentYourOrder}>
          <p>Twoje zamówienie</p>
          <div className={styles.checkoutPageContentYourOrderContent}>
            {cart.map((product, index) => <CheckoutOrderItem key={index} data={product}></CheckoutOrderItem>)}
          </div>
          <p>RAZEM: {totalPrice} zł</p>
        </div>
        <div className={styles.placeOrder}>Zamów</div>
      </div>
    </div>
  )
}

export default CheckoutPage