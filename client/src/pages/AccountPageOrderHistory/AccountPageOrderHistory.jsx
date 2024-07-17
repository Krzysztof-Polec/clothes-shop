import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Loading from "../../components/Loading/Loading"
import OrderedItem from "../../components/OrderedItem/OrderedItem"
import styles from "./AccountPageOrderHistory.module.scss"

const AccountPageOrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const jwt = sessionStorage.getItem("jwt")
  const user = JSON.parse(sessionStorage.getItem("user"))
  const navigate = useNavigate()

  useEffect(() => {
    const getOrderedItems = async () => {
      if(!jwt){
        navigate("/logowanie")
        return
      }

      await axios.get(`${import.meta.env.VITE_APP_API_URL}/orders?filters[userId][$eq]=${user.id}&populate=*`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then(response => {
        setOrders(response.data.data)
        setLoading(false)
      }).catch(error => {
        console.log(error)
        setLoading(false)
      })
    }

    getOrderedItems()
  }, [jwt])

  if(loading) return <Loading></Loading>

  return(
    <div className={styles.accountPageOrderHistory}>
      <p className={styles.accountPageOrderHistoryHeader}>Historia zamówień</p>
      <div>
        {orders.map(order => <OrderedItem key={order.id} data={order}></OrderedItem>)}
      </div>
    </div>
  )
}

export default AccountPageOrderHistory