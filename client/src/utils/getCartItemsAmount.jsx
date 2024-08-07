import axios from "axios"

const getCartItemsAmount = async ({ setTotalCartItem }) => {
  const jwt = sessionStorage.getItem("jwt")
  const user = JSON.parse(sessionStorage.getItem("user"))

  if(!jwt) return

  try{
    const userCartResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user-carts?populate=*&filters[userId][$eq]=${user.id}`, {
      headers: { Authorization: `bearer ${jwt}` }
    })

    const cartItems = userCartResponse.data?.data[0]

    if(cartItems){
      let totalItems = 0

      cartItems.attributes.cartProductList.forEach(product => {
        totalItems += product.amount
      })

      setTotalCartItem(totalItems)
    }else{
      setTotalCartItem(0)
    }
  }catch(err){
    console.log(err)
  }
}

export default getCartItemsAmount