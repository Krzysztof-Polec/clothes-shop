import axios from "axios"

const handleAddToCart = async ({ productId, productAmount, productPrice, updateCart, setUpdateCart, navigate, showToast }) => {
  const jwt = sessionStorage.getItem("jwt")
  const user = JSON.parse(sessionStorage.getItem("user"))

  if(!jwt){
    navigate("/logowanie")
    return
  }

  try{
    const cartResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user-carts?filters[userId][$eq]=${user.id}&populate=cartProductList.product`, {
      headers: { Authorization: `bearer ${jwt}` }
    })

    let cart = cartResponse.data.data[0]

    let cartId
    let cartProductList = []

    if(cart){
      cartId = cart.id
      cartProductList = cart.attributes.cartProductList
    }else{
      const newCartData = {
        data: {
          userId: user.id,
          users_permissions_user: user.id,
          cartProductList: []
        }
      }

      const newCartResponse = await axios.post(`${import.meta.env.VITE_APP_API_URL}/user-carts`, newCartData, {
        headers: { Authorization: `Bearer ${jwt}` }
      })

      cartId = newCartResponse.data.data.id
    }
    
    const existingProductIndex = cartProductList.findIndex(cartProduct => cartProduct.product.data.id === productId)

    if(existingProductIndex !== -1){
      const existingProduct = cartProductList[existingProductIndex]
      const updatedAmount = existingProduct.amount + productAmount
      const updatedPrice = (updatedAmount * productPrice).toFixed(2)

      cartProductList[existingProductIndex] = {
        ...existingProduct,
        amount: updatedAmount,
        price: updatedPrice
      }

      const updatedData = {
        data: {
          cartProductList: cartProductList
        }
      }

      await axios.put(`${import.meta.env.VITE_APP_API_URL}/user-carts/${cartId}`, updatedData, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
    }else{
      const newCartProduct = {
        amount: productAmount,
        price: (productAmount * productPrice).toFixed(2),
        product: { id: productId }
      }

      cartProductList.push(newCartProduct)

      const updatedData = {
        data: {
          cartProductList: cartProductList
        }
      }
      
      await axios.put(`${import.meta.env.VITE_APP_API_URL}/user-carts/${cartId}`, updatedData, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
    }

    setUpdateCart(!updateCart)
    showToast("Dodano do koszyka")
  }catch(error){
    console.log(error)
  }
}

export default handleAddToCart