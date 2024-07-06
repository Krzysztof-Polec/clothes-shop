import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useToast } from "../../components/Toast/Toast"
import styles from "./RegisterPage.module.scss"

const RegisterPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleUsernameChange = (e) => setUsername(e.target.value)

  const handleEmailChange = (e) => setEmail(e.target.value)

  const handlePasswordChange = (e) => setPassword(e.target.value)

  useEffect(()=>{
    const jwt = sessionStorage.getItem("jwt")

    if(jwt) navigate("/konto")
  },[])
  
  const handleCreateUserAccount =  () => {
    const data = {
      username: username,
      email: email,
      password: password
    }

    if(username.length < 3){
      showToast("Nazwa musi być dłuższa")
      return
    }

    if(!email.includes("@") || email.length < 6){
      showToast("Email jest za krótki albo nie zawiera @")
      return
    }

    if(password.length < 6){
      showToast("Hasło jest za krótkie")
      return
    }

    axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/local/register`, data).then(resp => {
      sessionStorage.setItem("user",JSON.stringify(resp.data.user))
      sessionStorage.setItem("jwt",resp.data.jwt)
      navigate("/logowanie")
      setUsername("")
      setEmail("")
      setPassword("")
    }).catch(error => {
      showToast("Rejestracja nie powiodła się")
    })
  }
  
  return(
    <div className={styles.registerPage}>
      <div className={styles.registerPageHeader}>
        <h2>Rejestracja</h2>
      </div>
      <div className={styles.registerPageMainContent}>
        <input type="text" placeholder="nazwa" value={username} onChange={handleUsernameChange}></input>
        <input type="email" placeholder="email" value={email} onChange={handleEmailChange}></input>
        <input type="password" placeholder="hasło" value={password} onChange={handlePasswordChange}></input>
        <button onClick={handleCreateUserAccount} disabled={!(username && email && password)}>Zarejestruj się</button>
        <div>
          <Link to="/logowanie">Masz już konto? Zaloguj się!</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage