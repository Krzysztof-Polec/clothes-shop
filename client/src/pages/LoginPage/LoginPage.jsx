import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./LoginPage.module.scss"
import Toast from "../../components/Toast/Toast"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(()=>{
    const jwt = sessionStorage.getItem("jwt")

    if(jwt) navigate("/konto")
  },[])

  useEffect(() => {
    if(error){
      const timer = setTimeout(() => {
        setError(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleEmailChange = (e) => setEmail(e.target.value)

  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSignIn = () => {
    const data = {
      identifier: email,
      password: password
    }

    console.log(data)
    if(!email.includes("@") || email.length < 6){
      setError("Email jest za krótki albo nie zawiera @")
      return
    }

    if(password.length < 6){
      setError("Hasło jest za krótkie")
      return
    }

    axios.post(import.meta.env.VITE_APP_API_URL + "/auth/local",data).then(resp => {
      console.log(resp.data.user)
      console.log(resp.data.jwt)
      sessionStorage.setItem("user",JSON.stringify(resp.data.user))
      sessionStorage.setItem("jwt",resp.data.jwt)
      navigate("/konto")
      setEmail("")
      setPassword("")
      setError("")
    }).catch(error => {
      setError("logowanie nie powiodło się")
    })
  }

  return(
    <>
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
      {error && <Toast text={error}></Toast>}
    </>
  )
}

export default LoginPage
