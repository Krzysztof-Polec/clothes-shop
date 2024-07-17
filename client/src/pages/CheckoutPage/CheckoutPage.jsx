import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useToast } from "../../components/Toast/Toast"
import { UpdateCartContext } from "../../context/UpdateCartContext"
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm"
import styles from "./CheckoutPage.module.scss"
import Loading from "../../components/Loading/Loading"
import CheckoutOrderItem from "../../components/CheckoutOrderItem/CheckoutOrderItem"

const CheckoutPage = () => {
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const [userZipCode, setUserZipCode] = useState("")
  const [userAddress, setUserAddress] = useState("")
  const jwt = sessionStorage.getItem("jwt")
  const user = JSON.parse(sessionStorage.getItem("user"))
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext)

  useEffect(() => {
    const getCartItems = async () => {
      if(!jwt){
        navigate("/logowanie")
        return
      }

      await axios.get(`${import.meta.env.VITE_APP_API_URL}/user-carts?populate[0]=cartProductList&populate[1]=cartProductList.product&populate[2]=cartProductList.product.product_img1&filters[userId][$eq]=${user.id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then(response => {
        const data = response.data?.data
        const cartItemsList = data[0].attributes.cartProductList.map((item, index) => ({
          product_name: item.product.data.attributes.product_name,
          amount: item.amount,
          price: item.price,
          actualPrice: item.product.data.attributes.product_price,
          image: item.product.data.attributes.product_img1.data.attributes.url,
          imageAlt: item.product.data.attributes.product_img1.data.attributes.alternativeText,
          product_id: item.product.data.id,
          cart_id: data[0].id
        }))
        setCart(cartItemsList)
        setLoading(false)
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

  const handleCheckoutButtonClick = async () => {
    if(
      userName.length > 0 &&
      userLastName.length > 0 &&
      userEmail.length > 0 &&
      userPhoneNumber.length > 0 &&
      userZipCode.length > 0 &&
      userAddress.length > 0
    ){
      try{
        setLoading(true)
        const orderResponse = await axios.post(`${import.meta.env.VITE_APP_API_URL}/orders`,{
          data: {
            username: userName,
            userLastName: userLastName,
            email: userEmail,
            phone: userPhoneNumber,
            zip: userZipCode,
            address: userAddress,
            totalOrderAmount: totalPrice,
            userId: user.id,
            orderItemList: cart.map((product) => ({
              amount: product.amount,
              price: product.price,
              product: product.product_id,
            })),
            users_permissions_user: user.id,
          },
        },
        {headers: { Authorization: `Bearer ${jwt}` }})
  
        if(orderResponse.status === 200){
          const cartId = cart.length > 0 ? cart[0].cart_id : null

          if(cartId){
            await axios.delete(
              `${import.meta.env.VITE_APP_API_URL}/user-carts/${cartId}`,
              {
                headers: { Authorization: `Bearer ${jwt}` }
              }
            )
          }

          showToast("Zamówienie złożone pomyślnie!")
          navigate("/")
          setCart([])
          setUpdateCart(!updateCart)
        }else{
          showToast("Błąd przy składaniu zamówienia")
        }
      }catch(error){
        console.error("Błąd przy składaniu zamówienia: ", error)
        showToast("Błąd przy składaniu zamówienia")
      }finally{
        setLoading(false)
      }
    }else{
      showToast("Wypełnij wszystkie pola formularza!")
    }
  }  

  if(loading) return <Loading></Loading>

  return(
    <div className={styles.checkoutPage}>
      <div className={styles.checkoutPageHeader}>
        <p>Podsumowanie</p>
      </div>
      <div className={styles.checkoutPageContent}>
        <CheckoutForm setUserName={setUserName} setUserLastName={setUserLastName} setUserEmail={setUserEmail} setUserPhoneNumber={setUserPhoneNumber} setUserZipCode={setUserZipCode} setUserAddress={setUserAddress}></CheckoutForm>
        <div className={styles.checkoutPageContentYourOrder}>
          <p>Twoje zamówienie</p>
          <div className={styles.checkoutPageContentYourOrderContent}>
            {cart.map((product, index) => <CheckoutOrderItem key={index} data={product}></CheckoutOrderItem>)}
          </div>
          <p>RAZEM: {totalPrice} zł</p>
        </div>
        <div className={styles.placeOrder} onClick={handleCheckoutButtonClick}>Zamów</div>
      </div>
    </div>
  )
}

export default CheckoutPage