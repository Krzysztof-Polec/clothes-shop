import { useState, useEffect } from "react"
import { useLocation, Outlet } from "react-router-dom"
import { UpdateCartContext } from "../context/UpdateCartContext"
import { ToastProvider } from "../components/Toast/Toast"
import { UpdateWishlistIconProvider } from "../context/UpdateWishlistIconContext"
import PageHeader from "../components/PageHeader/PageHeader"
import Footer from "../components/Footer/Footer"

const Layout = () => {
  const useScrollToTop = () => {
    const { pathname } = useLocation()
  
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])
  }

  const [updateCart, setUpdateCart] = useState(false)
  useScrollToTop()

  return(
    <UpdateCartContext.Provider value={{updateCart, setUpdateCart}}>
      <ToastProvider>
        <UpdateWishlistIconProvider>
          <div>
            <PageHeader></PageHeader>
            <Outlet></Outlet>
            <Footer></Footer>
          </div>
        </UpdateWishlistIconProvider>
      </ToastProvider>
    </UpdateCartContext.Provider>
  )
}

export default Layout