import { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom"
import { UpdateCartContext } from "../../context/UpdateCartContext"
import { ToastProvider } from "../Toast/Toast"
import { UpdateWishlistIconProvider } from "../../context/UpdateWishlistIconContext"
import Footer from "../Footer/Footer"
import PageHeader from "../PageHeader/PageHeader"
import ShopPage from "../../pages/ShopPage/ShopPage"
import ProductsPage from "../../pages/ProductsPage/ProductsPage"
import ProductPage from "../../pages/ProductPage/ProductPage"
import ContactPage from "../../pages/ContactPage/ContactPage"
import AboutUsPage from "../../pages/AboutUsPage/AboutUsPage"
import SearchPage from "../../pages/SearchPage/SearchPage"
import AccountPage from "../../pages/AccountPage/AccountPage"
import CartPage from "../../pages/CartPage/CartPage"
import Page404 from "../../pages/Page404/Page404"
import RegisterPage from "../../pages/RegisterPage/RegisterPage"
import LoginPage from "../../pages/LoginPage/LoginPage"

const useScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}

const Layout = () => {
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <ShopPage></ShopPage>
      },
      {
        path: "/produkty",
        element: <ProductsPage></ProductsPage>
      },
      {
        path: "produkty/:category/:product",
        element: <ProductPage></ProductPage>
      },
      {
        path: "/kontakt",
        element: <ContactPage></ContactPage>
      },
      {
        path: "/o-nas",
        element: <AboutUsPage></AboutUsPage>
      },
      {
        path: "/szukaj",
        element: <SearchPage></SearchPage>
      },
      {
        path: "/rejestracja",
        element: <RegisterPage></RegisterPage>
      },
      {
        path: "/logowanie",
        element: <LoginPage></LoginPage>
      },
      {
        path: "/konto",
        element: <AccountPage></AccountPage>
      },
      {
        path: "/koszyk",
        element: <CartPage></CartPage>
      },
      {
        path: "*",
        element: <Page404></Page404>
      }
    ]
  }
])

const App = () => <RouterProvider router={router}></RouterProvider> 

export default App