import axios from "axios"

const handleAddToCart = async ({productId, productAmount, productPrice, updateCart, setUpdateCart, navigate, showToast}) => {
  const jwt = sessionStorage.getItem("jwt")
  const user = JSON.parse(sessionStorage.getItem("user"))

  if(!jwt){
    navigate("/logowanie")
    return
  }

  try{
    const cartResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user-carts?filters[userId][$eq]=${user.id}&populate=products`, {
      headers: {Authorization: `bearer ${jwt}`}
    })

    let cart = cartResponse.data.data

    const existingCartItem = cart.find(userCart => 
      userCart.attributes.products.data.some(product => product.id === productId)
    )

    if(existingCartItem){
      const productInCart = existingCartItem.attributes.products.data.find(product => product.id === productId)
      const updatedAmount = existingCartItem.attributes.amount + productAmount
      const updatedPrice = (updatedAmount * productInCart.attributes.product_price).toFixed(2)

      const updatedData = {
        data: {
          amount: updatedAmount,
          price: updatedPrice,
        }
      }

      await axios.put(`${import.meta.env.VITE_APP_API_URL}/user-carts/${existingCartItem.id}`, updatedData, {
        headers: {Authorization: `Bearer ${jwt}`}
      })
    }else{
      const newData = {
        data: {
          amount: productAmount,
          price: (productAmount * productPrice).toFixed(2),
          products: [{ id: productId }],
          users_permissions_user: user.id,
          userId: user.id,
        },
      }

      await axios.post(`${import.meta.env.VITE_APP_API_URL}/user-carts`, newData, {
        headers: {Authorization: `Bearer ${jwt}`}
      })
    }

    setUpdateCart(!updateCart)
    showToast("Dodano do koszyka")
  }catch(error){
    console.log(error)
  }
}

export default handleAddToCart