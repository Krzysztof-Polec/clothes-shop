import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./RegisterPage.module.scss"
import Toast from "../../components/Toast/Toast"

const RegisterPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleUsernameChange = (e) => setUsername(e.target.value)

  const handleEmailChange = (e) => setEmail(e.target.value)

  const handlePasswordChange = (e) => setPassword(e.target.value)

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
  
  const handleCreateUserAccount =  () => {
    const data = {
      username: username,
      email: email,
      password: password
    }

    if(username.length < 3){
      setError("Nazwa musi być dłuższa")
      return
    }

    if(!email.includes("@") || email.length < 6){
      setError("Email jest za krótki albo nie zawiera @")
      return
    }

    if(password.length < 6){
      setError("Hasło jest za krótkie")
      return
    }

    console.log(data)
    axios.post(import.meta.env.VITE_APP_API_URL + "/auth/local/register", data).then(resp => {
      console.log(resp.data.user)
      console.log(resp.data.jwt)
      sessionStorage.setItem("user",JSON.stringify(resp.data.user))
      sessionStorage.setItem("jwt",resp.data.jwt)
      navigate("/logowanie")
      setUsername("")
      setEmail("")
      setPassword("")
      setError("")
    }).catch(error => {
      setError("Rejestracja nie powiodła się")
    })
  }
  
  return(
    <>
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
     <Toast text={error}></Toast>
    </>
  )
}

export default RegisterPage