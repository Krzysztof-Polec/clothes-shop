import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Loading from "../../components/Loading/Loading"
import WishlistItem from "../../components/WishlistItem/WishlistItem"
import styles from "./AccountPageWishlist.module.scss"

const AccountPageWishlist = () => {
  const [userWishlist, setUserWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const jwt = sessionStorage.getItem("jwt")
  const user = JSON.parse(sessionStorage.getItem("user"))
  const navigate = useNavigate()

  useEffect(() => {
    const getWishlistItems = async () => {
      if(!jwt){
        navigate("/logowanie")
        return
      }

      await axios.get(`${import.meta.env.VITE_APP_API_URL}/user-wishlists?populate[0]=products&populate[1]=products.product_img1&filters[userId][$eq]=${user.id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then(response => {
        setUserWishlist(response.data.data[0].attributes.products.data)
        setLoading(false)
      }).catch(error => {
        console.log(error)
        setLoading(false)
      })
    }

    getWishlistItems()
  }, [jwt])

  if(loading) return <Loading></Loading>

  return(
    <div className={styles.accountPageWishlist}>
      <p>Lista życzeń</p>
      <div>
        {userWishlist.map(item => <WishlistItem key={item.id} data={item}></WishlistItem>)}
      </div>
    </div>
  )
}

export default AccountPageWishlist