import { createContext, useState } from "react"

export const UpdateWishlistIconContext = createContext()

export const UpdateWishlistIconProvider = ({ children }) => {
  const [updateWishlistIcon, setUpdateWishlistIcon] = useState(false)

  return(
    <UpdateWishlistIconContext.Provider value={{ updateWishlistIcon, setUpdateWishlistIcon }}>
      {children}
    </UpdateWishlistIconContext.Provider>
  )
}
