import { useState } from "react"
import FilterPanel from "../FilterPanel/FilterPanel"
import styles from "./ProductsPageContentHeader.module.scss"

const ProductsPageContentHeader = ({ productAmount, selectedFilters, setSelectedFilters }) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)

  const toggleFilterPanel = () => setIsFilterPanelOpen(!isFilterPanelOpen)
  
  const polishAmount = () => {
    if(productAmount == 1){
      return "produkt"
    }else if(productAmount >= 2 && productAmount <= 4){
      return "produkty"
    }else{
      return "produktów"
    }
  }

  return(
    <>
      <div className={styles.productsPageContentHeader}>
        <div>
          <p>{productAmount} {polishAmount()}</p>
        </div>
        <div onClick={toggleFilterPanel}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 
              320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 
              97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
            />
          </svg>
          <p>filtry</p>
        </div>
      </div>
      {isFilterPanelOpen && <FilterPanel selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} isFilterPanelOpen={isFilterPanelOpen} toggleFilterPanel={toggleFilterPanel}></FilterPanel>}
    </>
  )
}

export default ProductsPageContentHeader