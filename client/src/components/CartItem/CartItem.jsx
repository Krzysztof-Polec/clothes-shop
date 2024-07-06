import styels from "./CartItem.module.scss"

const CartItem = ({ data, updateAmount, removeItem }) => {
  return(
    <div className={styels.cartItem}>
      <div className={styels.cartItemLeftPanel}>
        <img src={import.meta.env.VITE_APP_UPLOAD_URL + data.image} alt={data.imageAlt}></img>
        <div className={styels.cartItemProductInfo}>
          <p>{data.product_name}</p>
          <p>{data.price} zł</p>
          <p onClick={() => removeItem(data.cart_id)}>Usuń</p>
        </div>
      </div>
      <div className={styels.cartItemRightPanel}>
        <div className={styels.cartItemAmount}>
          <p onClick={() => updateAmount(data.cart_id, data.amount - 1, data.actualPrice)}>-</p>
          <p>{data.amount}</p>
          <p onClick={() => updateAmount(data.cart_id, data.amount + 1, data.actualPrice)}>+</p>
        </div>
        <div className={styels.cartItemDelete} onClick={() => removeItem(data.cart_id)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 
            96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 
            6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 
            467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default CartItem