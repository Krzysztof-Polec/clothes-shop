import { useState, useEffect } from "react"
import styles from "./Toast.module.scss"

const Toast = ({ text }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if(text){
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [text])

  return <div className={`${styles.toast} ${show ? styles.show : ""}`}>{text}</div>
}

export default Toast
