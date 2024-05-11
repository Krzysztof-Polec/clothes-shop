import { useState, useEffect } from "react"
import axios from "axios"
import styles from "./FilterPanel.module.scss"

const FilterPanel = ({ selectedFilters, setSelectedFilters, isFilterPanelOpen, toggleFilterPanel }) => {
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const categoryResponse = await axios.get(import.meta.env.VITE_APP_API_URL+`/categories`, {
          headers: {Authorization: "bearer " + import.meta.env.VITE_APP_API_TOKEN}
        })
        setCategories(categoryResponse?.data.data)

        const subCategoryResponse = await axios.get(import.meta.env.VITE_APP_API_URL+`/sub-categories`, {
          headers: {Authorization: "bearer " + import.meta.env.VITE_APP_API_TOKEN}
        })
        setSubCategories(subCategoryResponse?.data.data)
      }catch(err){
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = selectedFilters.categories.includes(categoryId)
      ? selectedFilters.categories.filter(id => id !== categoryId)
      : [...selectedFilters.categories, categoryId]
    setSelectedFilters({ ...selectedFilters, categories: updatedCategories })
  }

  const handleSubCategoryChange = (subCategoryId) => {
    const updatedSubCategories = selectedFilters.subCategories.includes(subCategoryId)
      ? selectedFilters.subCategories.filter(id => id !== subCategoryId)
      : [...selectedFilters.subCategories, subCategoryId]
    setSelectedFilters({ ...selectedFilters, subCategories: updatedSubCategories })
  }

  const handleOtherFiltersChange = (filterName) => setSelectedFilters({ ...selectedFilters, [filterName]: !selectedFilters[filterName] })
  
  const handlePriceChange = (event, priceType) => setSelectedFilters({ ...selectedFilters, [priceType]: event.target.value })

  return(
    <div className={`${styles.filterPanel} ${!isFilterPanelOpen && styles.hidden}`}>
      <div className={styles.filterPanelHeader}>
        <p>Filtry</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" onClick={toggleFilterPanel}>
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 
            0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 
            45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 
            45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 
            0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </div>
      <div className={styles.filterPanelMainContent}>
        <div className={styles.filterPanelMainContentCategories}>
          <p>Kategorie</p>
          {categories.map(category => (
            <div key={category.id}>
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={selectedFilters.categories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label htmlFor={`category-${category.id}`}>{category.attributes.category_name}</label>
            </div>
          ))}
        </div>
        <div className={styles.filterPanelMainContentSubCategories}>
          <p>Podkategorie</p>
          {subCategories.map(subCategory => (
            <div key={subCategory.id}>
              <input
                type="checkbox"
                id={`sub-category-${subCategory.id}`}
                checked={selectedFilters.subCategories.includes(subCategory.id)}
                onChange={() => handleSubCategoryChange(subCategory.id)}
              />
              <label htmlFor={`sub-category-${subCategory.id}`}>{subCategory.attributes.subCategory_name}</label>
            </div>
          ))}
        </div>
        <div className={styles.filterPanelMainContentSpecialProducts}>
          <div>
          <input
              type="checkbox"
              checked={selectedFilters.product_isBestseller}
              id="bestsellers"
              onChange={() => handleOtherFiltersChange("product_isBestseller")}
            />
            <label htmlFor="bestsellers">Bestsellery</label>
          </div>
          <div>
          <input
              type="checkbox"
              id="onSale"
              checked={selectedFilters.product_isOnSale}
              onChange={() => handleOtherFiltersChange("product_isOnSale")}
            />
            <label htmlFor="onSale">Na wyprzedazy</label>
          </div>
          <div>
          <input
              type="checkbox"
              checked={selectedFilters.product_isNew}
              id="isNew"
              onChange={() => handleOtherFiltersChange("product_isNew")}
            />
            <label htmlFor="isNew">nowości</label>
          </div>
        </div>
        <div className={styles.filterPanelMainContentMinMaxProductPrice}>
          <div>
            <label>Cena od: </label>
            <input
              type="number"
              value={selectedFilters.minPrice}
              onChange={(event) => handlePriceChange(event, "minPrice")}
            />
          </div>
          <div>
            <label>Cena do: </label>
            <input
              type="number"
              value={selectedFilters.maxPrice}
              onChange={(event) => handlePriceChange(event, "maxPrice")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel