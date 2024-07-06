import axios from "axios"

const handleAddToWishlist = async ({productId, navigate, showToast, updateWishlistIcon, setUpdateWishlistIcon }) => {
  const jwt = sessionStorage.getItem("jwt")
  const user = JSON.parse(sessionStorage.getItem("user"))

  if(!jwt){
    navigate("/logowanie")
    return
  }

  try{
    const wishlistResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user-wishlists?filters[userId][$eq]=${user.id}&populate=products`, {
      headers: {Authorization: `Bearer ${jwt}`}
    })

    let wishlist = wishlistResponse.data.data
    
    const existingWishlistItem = wishlist.find(userWishlist => 
      userWishlist.attributes.products.data.some(product => product.id === productId)
    )

    if(existingWishlistItem){
      await axios.delete(`${import.meta.env.VITE_APP_API_URL}/user-wishlists/${existingWishlistItem.id}`, {
        headers: {Authorization: `Bearer ${jwt}`}
      })
      showToast("Usunięto z ulubionych")
    }else{
      const newData = {
        data: {
          products: [productId],
          users_permissions_user: user.id,
          userId: user.id,
        },
      }

      await axios.post(`${import.meta.env.VITE_APP_API_URL}/user-wishlists`, newData, {
        headers: {Authorization: `Bearer ${jwt}`}
      })
      showToast("Dodano do ulubionych")
    }
    
    setUpdateWishlistIcon(!updateWishlistIcon)
  }catch(error){
    console.log(error)
  }
}

export default handleAddToWishlist