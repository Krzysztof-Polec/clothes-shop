import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useToast } from "../../components/Toast/Toast"
import Loading from "../../components/Loading/Loading"
import styles from "./AccountPageInformations.module.scss"

const AccountPageInformations = () => {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const jwt = sessionStorage.getItem("jwt")
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    if(!jwt){
      navigate("/logowanie")
      return
    }

    if(jwt){
      axios.get(`${import.meta.env.VITE_APP_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` }
      }).then(response => {
        setUserData(response.data)
        setLoading(false)
        }).catch(error => {
          console.log(error)
          setLoading(false)
        })
    }else{
      setLoading(false)
    }
  }, [jwt])

  const handleNewPasswordInputChange = (e) => setNewPassword(e.target.value)

  const handleConfirmNewPasswordInputChange = (e) => setConfirmNewPassword(e.target.value)

  const handleChangePasswordButtonClick = async () => {
    if(newPassword === confirmNewPassword){
      try{
        await axios.put(`${import.meta.env.VITE_APP_API_URL}/users/${userData.id}`, {
          password: newPassword,
        }, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
  
        showToast("Hasło zostało zmienione!")
        setNewPassword("")
        setConfirmNewPassword("")
      }catch(error){
        showToast("Wystąpił bład")
      }
    }else{
      showToast("Hasła nie są takie same!")
    }
  }

  if(loading) return <Loading></Loading>

  return(
    <div className={styles.accountPageInformations}>
      <p className={styles.accountPageInformationsHeader}>Informacje o koncie</p>
      <div>
        <p>Nazwa użytkownika: {userData.username}</p>
        <p>Email: {userData.email}</p>
      </div>
      <p className={styles.accountPageInformationsHeader}>Zmiana Hasła</p>
      <div>
        <label htmlFor="newPassword">Nowe hasło</label>
        <input type="password" id="newPassword" value={newPassword} onChange={handleNewPasswordInputChange}></input>
        <label htmlFor="confirmNewPassword">Potwierdz nowe hasło</label>
        <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={handleConfirmNewPasswordInputChange}></input>
      </div>
      <div className={styles.changePassword} onClick={handleChangePasswordButtonClick}>Zmień hasło</div>
    </div>
  )
}

export default AccountPageInformations