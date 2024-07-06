import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import SingleProduct from "../../components/SingleProduct/SingleProduct"
import Loading from "../../components/Loading/Loading"

const ProductPage = () => {
  const [singleProduct, setSingleProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const { product } = useParams()
  const productName = product.replace(/-/g, " ")

  useEffect(() => {
    const fetchData = async () => {
      try{
        const productResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}/products?populate=*&filters[product_name][$eqi]=${productName}`, {
          headers: {Authorization: `bearer ${import.meta.env.VITE_APP_API_TOKEN}`}
        })
        setSingleProduct(productResponse.data.data)
        setLoading(false)
      }catch(err){
        console.log(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [productName])

  return loading ? <Loading></Loading> : <SingleProduct data={singleProduct}></SingleProduct>
}

export default ProductPage