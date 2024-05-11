import { useState, useEffect } from "react"
import axios from "axios"
import ProductsPageContentHeader from "../../components/ProductsPageContentHeader/ProductsPageContentHeader"
import Loading from "../../components/Loading/Loading"
import Product from "../../components/Product/Product"
import styles from "./ProductsPage.module.scss"

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    subCategories: [],
    product_isBestseller: false,
    product_isOnSale: false,
    product_isNew: false,
    minPrice: "",
    maxPrice: ""
  })

  const query = () => {
    const params = new URLSearchParams()

    selectedFilters.categories.forEach((categoryId) => params.append("filters[categories][$eq]", categoryId))

    selectedFilters.subCategories.forEach((subCategoryId) => params.append("filters[sub_categories][$eq]", subCategoryId))

    const booleanFilters = ["product_isBestseller", "product_isOnSale", "product_isNew"]
    for(const filter of booleanFilters){
      if(selectedFilters[filter]) params.append(`filters[${filter}][$eq]`, "true")
    }

    if(selectedFilters.minPrice !== "") params.append("filters[product_price][$gte]", selectedFilters.minPrice)

    if(selectedFilters.maxPrice !== "" && selectedFilters.minPrice === ""){
      params.append("filters[product_price][$lte]", selectedFilters.maxPrice)
    }else if(selectedFilters.maxPrice !== "" && selectedFilters.minPrice !== ""){
      params.append("filters[product_price][$lte]", selectedFilters.maxPrice)
    }

    return decodeURIComponent(params.toString())
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        const filteredProductsResponse = await axios.get(import.meta.env.VITE_APP_API_URL+`/products?${query()}`, {
          headers: {Authorization: "bearer " + import.meta.env.VITE_APP_API_TOKEN},
          params: {
            populate: ["categories", "sub_categories", "product_img1", "product_img2", "product_img3"]
          }
        })
        setProducts(filteredProductsResponse?.data.data)

        setLoading(false)
      }catch(err){
        console.error(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedFilters])

  return(
    <div className={styles.productsPage}>
      <ProductsPageContentHeader productAmount={products.length} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}></ProductsPageContentHeader>
      <div className={styles.productsPageMainContent}>
        {loading ? (
          <Loading></Loading>
        ) : (
          products.map(product => <Product key={product.id} product={product}></Product>)
        )}
      </div>
    </div>
  )
}

export default ProductsPage