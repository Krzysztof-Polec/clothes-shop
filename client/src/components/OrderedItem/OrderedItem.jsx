import styles from "./OrderedItem.module.scss"

const OrderedItem = ({ data }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
  }

  const orderId = data.id
  const formatedDate = formatDate(data.attributes.publishedAt)
  const totalOrderAmount = data.attributes.totalOrderAmount
  const orderProductAmount = data.attributes.orderItemList.reduce((sum, item) => sum + item.amount, 0)

  return(
    <div className={styles.orderedItem}>
      <p>#{orderId}</p>
      <p>{formatedDate}</p>
      <p>{totalOrderAmount} zł za {orderProductAmount} produktów</p>
    </div>
  )
}

export default OrderedItem