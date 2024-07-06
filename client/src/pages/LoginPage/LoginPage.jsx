import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useToast } from "../../components/Toast/Toast"
import { UpdateCartContext } from "../../context/UpdateCartContext"
import styles from "./LoginPage.module.scss"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext)

  useEffect(()=>{
    const jwt = sessionStorage.getItem("jwt")

    if(jwt) navigate("/konto")
  },[])

  const handleEmailChange = (e) => setEmail(e.target.value)

  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSignIn = () => {
    const data = {
      identifier: email,
      password: password
    }

    if(!email.includes("@") || email.length < 6){
      showToast("Email jest za krótki albo nie zawiera @")
      return
    }

    if(password.length < 6){
      showToast("Hasło jest za krótkie")
      return
    }

    axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/local`,data).then(resp => {
      sessionStorage.setItem("user",JSON.stringify(resp.data.user))
      sessionStorage.setItem("jwt",resp.data.jwt)
      navigate("/konto")
      setUpdateCart(!updateCart)
      setEmail("")
      setPassword("")
    }).catch(error => {
      showToast("logowanie nie powiodło się")
    })
  }

  return(
    <div className={styles.loginPage}>
      <div className={styles.loginPageHeader}>
        <h2>Logowanie</h2>
      </div>
      <div className={styles.loginPageMainContent}>
        <input type="email" placeholder="email" value={email} onChange={handleEmailChange}></input>
        <input type="password" placeholder="hasło" value={password} onChange={handlePasswordChange}></input>
        <button onClick={handleSignIn} disabled={!(email && password)}>Zaloguj się</button>
        <div>
          <Link to="/rejestracja">Nie masz konta? Utwórz je!</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage