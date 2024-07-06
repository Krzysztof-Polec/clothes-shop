import styles from "./CheckoutOrderItem.module.scss"

const CheckoutOrderItem = ({ data }) => {
  return(
    <div className={styles.checkoutOrderItem}>
      <p>{data.product_name}</p>
      <p>x{data.amount}</p>
      <p>{data.price} zł</p>
    </div>
  )
}

export default CheckoutOrderItem