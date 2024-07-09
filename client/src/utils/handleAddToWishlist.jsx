import axios from "axios"

const handleAddToWishlist = async ({ productId, navigate, showToast, updateWishlistIcon, setUpdateWishlistIcon }) => {
  const jwt = sessionStorage.getItem("jwt")
  const user = JSON.parse(sessionStorage.getItem("user"))

  if(!jwt){
    navigate("/logowanie")
    return
  }

  try{
    const wishlistResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user-wishlists?filters[userId][$eq]=${user.id}&populate=products`, {
      headers: { Authorization: `Bearer ${jwt}` }
    })

    let wishlist = wishlistResponse.data.data

    if(wishlist.length > 0){
      let userWishlist = wishlist[0]
      let productIds = userWishlist.attributes.products.data.map(product => product.id)

      if(productIds.includes(productId)){
        productIds = productIds.filter(id => id !== productId)
        showToast("Usunięto z ulubionych")
      }else{
        productIds.push(productId)
        showToast("Dodano do ulubionych")
      }

      if(productIds.length > 0){
        const updateData = {
          data: {
            products: productIds
          }
        }

        await axios.put(`${import.meta.env.VITE_APP_API_URL}/user-wishlists/${userWishlist.id}`, updateData, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
      }else{
        await axios.delete(`${import.meta.env.VITE_APP_API_URL}/user-wishlists/${userWishlist.id}`, {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        showToast("Lista ulubionych usunięta")
      }
    }else{
      const newData = {
        data: {
          products: [productId],
          users_permissions_user: user.id,
          userId: user.id,
        },
      }

      await axios.post(`${import.meta.env.VITE_APP_API_URL}/user-wishlists`, newData, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      showToast("Dodano do ulubionych")
    }

    setUpdateWishlistIcon(!updateWishlistIcon)
  }catch(error){
    console.log(error)
  }
}

export default handleAddToWishlist