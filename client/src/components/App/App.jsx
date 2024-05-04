import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import ShopPage from "../../pages/ShopPage/ShopPage"
import Footer from "../Footer/Footer"
import PageHeader from "../PageHeader/PageHeader"

const Layout = () => {
  return(
    <div>
      <PageHeader></PageHeader>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
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
      }
    ]
  }
])

const App = () => <RouterProvider router={router}></RouterProvider> 

export default App