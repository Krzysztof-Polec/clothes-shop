import { useEffect, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { UpdateCartContext } from "../../context/UpdateCartContext"
import CartItem from "../../components/CartItem/CartItem"
import Loading from "../../components/Loading/Loading"
import styles from "./CartPage.module.scss"

const CartPage = () => {
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const jwt = sessionStorage.getItem("jwt")
  const user = JSON.parse(sessionStorage.getItem("user"))
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext)
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
          actualPrice: item.attributes.products?.data[0].attributes.product_price,
          image: item.attributes.products?.data[0].attributes.product_img1.data.attributes.url,
          imageAlt: item.attributes.products?.data[0].attributes.product_img1.data.attributes.alternativeText,
          product_id: item.attributes.products?.data[0].id,
          cart_id: item.id
        }))
        setCart(cartItemsList)
        setLoading(false)
      }).catch(err => {
        console.log(err)
        setLoading(false)
      })
    }
    getCartItems()
  }, [jwt])

  useEffect(() => {
    const newTotalPrice = cart.reduce((total, product) => total + product.price, 0)
    setTotalPrice(newTotalPrice)
  }, [cart])

  const updateAmount = (cartId, amount, actualPrice) => {
    if(amount < 1) return
    const newPrice = amount * actualPrice

    axios.put(`${import.meta.env.VITE_APP_API_URL}/user-carts/${cartId}`, {
      data: { amount: amount, price: newPrice }
    }, {
      headers: { Authorization: `Bearer ${jwt}` }
    }).then(() => {
      setCart(cart.map(item => item.cart_id === cartId ? { ...item, amount: amount, price: newPrice } : item))
      setUpdateCart(!updateCart)
    }).catch(err => console.log(err))
  }

  const removeItem = (cartId) => {
    axios.delete(`${import.meta.env.VITE_APP_API_URL}/user-carts/${cartId}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    }).then(() => {
      setCart(cart.filter(item => item.cart_id !== cartId))
      setUpdateCart(!updateCart)
    }).catch(err => console.log(err))
  }

  if(loading) return <Loading></Loading>

  return(
    <div className={styles.cartPage}>
      <div className={styles.cartPageHeader}>
        <p>Koszyk</p>
      </div>
      <div className={styles.cartPageContent}>
        {cart.length > 0 ? (
          cart.map((product, index) => <CartItem key={index} data={product} updateAmount={updateAmount} removeItem={removeItem}></CartItem>)
        ) : (
          <p className={styles.cartPageContentInfo}>Twój koszyk jest pusty</p>
        )}
        {cart.length > 0 && (
          <div className={styles.cartPageCheckout}>
            <div className={styles.cartPageCheckoutLeftPanel}>
              <p>RAZEM: {totalPrice} zł</p>
            </div>
            <Link to={"/zamówienie/podsumowanie"}>Dalej</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage