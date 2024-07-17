import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./AccountPagePanel.module.scss"
import Loading from "../../components/Loading/Loading"

const AccountPagePanel = () => {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(true)
  const jwt = sessionStorage.getItem("jwt")
  const navigate = useNavigate()

  useEffect(() => {
    if(!jwt){
      navigate("/logowanie")
      return
    }

    if(jwt){
      axios.get(`${import.meta.env.VITE_APP_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` }
      }).then(response => {
        setUsername(response.data.username)
        setLoading(false)
        }).catch(error => {
          console.log(error)
          setLoading(false)
        })
    }else{
      setLoading(false)
    }
  }, [jwt])

  if(loading) return <Loading></Loading>

  return(
    <div className={styles.accountPagePanel}>
      <p>Witaj {username} z poziomu swojego konta możesz zobaczyć swoje informacje o koncie, hisorie zamówień oraz produkty z listy życzeń</p>
    </div>
  )
}

export default AccountPagePanel