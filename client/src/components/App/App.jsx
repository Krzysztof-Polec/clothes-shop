import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ShopPage from "../../pages/ShopPage/ShopPage"
import ProductsPage from "../../pages/ProductsPage/ProductsPage"
import ProductPage from "../../pages/ProductPage/ProductPage"
import ContactPage from "../../pages/ContactPage/ContactPage"
import AboutUsPage from "../../pages/AboutUsPage/AboutUsPage"
import SearchPage from "../../pages/SearchPage/SearchPage"
import AccountPagePanel from "../../pages/AccountPagePanel/AccountPagePanel"
import AccountPageInformations from "../../pages/AccountPageInformations/AccountPageInformations"
import AccountPageOrderHistory from "../../pages/AccountPageOrderHistory/AccountPageOrderHistory"
import AccountPageWishlist from "../../pages/AccountPageWishlist/AccountPageWishlist"
import CartPage from "../../pages/CartPage/CartPage"
import CheckoutPage from "../../pages/CheckoutPage/CheckoutPage"
import Page404 from "../../pages/Page404/Page404"
import RegisterPage from "../../pages/RegisterPage/RegisterPage"
import LoginPage from "../../pages/LoginPage/LoginPage"
import Layout from "../../layouts/Layout"
import AccountPageLayout from "../../layouts/AccountPageLayout/AccountPageLayout"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <ShopPage></ShopPage>,
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
        element: <AccountPageLayout></AccountPageLayout>,
        children: [
          {
            path: "/konto",
            element: <AccountPagePanel></AccountPagePanel>
          },
          {
            path: "/konto/informacje-o-koncie",
            element: <AccountPageInformations></AccountPageInformations>
          },
          {
            path: "/konto/historia-zamówień",
            element: <AccountPageOrderHistory></AccountPageOrderHistory>
          },
          {
            path: "/konto/lista-życzeń",
            element: <AccountPageWishlist></AccountPageWishlist>
          },
        ]
      },
      {
        path: "/koszyk",
        element: <CartPage></CartPage>
      },
      {
        path: "/zamówienie/podsumowanie",
        element: <CheckoutPage></CheckoutPage>
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