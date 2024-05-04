import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import SingleProduct from "../../components/SingleProduct/SingleProduct"

const ProductPage = () => {
  const [singleProduct, setSingleProduct] = useState([])
  const { product } = useParams()
  const productName = product.replace(/-/g, " ")

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(import.meta.env.VITE_APP_API_URL+`/products?populate=*&filters[product_name][$eqi]=${productName}`, {
          headers: {Authorization: "bearer " + import.meta.env.VITE_APP_API_TOKEN}
        })
        setSingleProduct(response.data.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [productName])

  return <SingleProduct data={singleProduct}></SingleProduct>
}

export default ProductPage