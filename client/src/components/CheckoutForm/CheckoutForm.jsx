import styles from "./CheckoutForm.module.scss"

const CheckoutForm = () => {
  return(
    <div className={styles.checkoutPageContentForm}>
      <p>Dane do zamówienia</p>
      <div>
        <div>
          <label htmlFor="firstName">Imie: </label>
          <input type="text" id="firstName"></input>
        </div>
        <div>
          <label htmlFor="lastName">Nazwisko: </label>
          <input type="text" id="lastName"></input>
        </div>
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email"></input>
      </div>
      <div>
        <label htmlFor="phone">Nr telefonu: </label>
        <input type="text" id="phone"></input>
      </div>
      <div>
        <label htmlFor="zip">Kod pocztowy: </label>
        <input type="text" id="zip"></input>
      </div>
      <div>
        <label htmlFor="address">Adres: </label>
        <input type="text" id="address"></input>
      </div>
    </div>
  )
}

export default CheckoutForm