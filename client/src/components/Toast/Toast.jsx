import { createContext, useContext, useState, useCallback } from "react"
import styles from "./Toast.module.scss"

const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ text: "", show: false })

  const showToast = useCallback((text) => {
    setToast({ text, show: true })
    setTimeout(() => {
      setToast({ text: "", show: false })
    }, 2900)
  }, [])

  return(
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast text={toast.text} show={toast.show}></Toast>
    </ToastContext.Provider>
  )
}

const Toast = ({ text, show }) => <div className={`${styles.toast} ${show ? styles.show : ""}`}>{text}</div>