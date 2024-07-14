import styles from "./CheckoutForm.module.scss"

const CheckoutForm = ({ setUserName, setUserLastName, setUserEmail, setUserPhoneNumber, setUserZipCode, setUserAddress }) => {

  const handleUserNameInputChange = (e) => setUserName(e.target.value)

  const handleUserLastNameInputChange = (e) => setUserLastName(e.target.value)

  const handleUserEmailInputChange = (e) => setUserEmail(e.target.value)

  const handleUserPhoneNumberInputChange = (e) => setUserPhoneNumber(e.target.value)

  const handleUserZipCodeInputChange = (e) => setUserZipCode(e.target.value)

  const handleUserAddressInputChange = (e) => setUserAddress(e.target.value)

  return(
    <div className={styles.checkoutPageContentForm}>
      <p>Dane do zamówienia</p>
      <div>
        <div>
          <label htmlFor="firstName">Imie: </label>
          <input type="text" id="firstName" onChange={handleUserNameInputChange}></input>
        </div>
        <div>
          <label htmlFor="lastName">Nazwisko: </label>
          <input type="text" id="lastName" onChange={handleUserLastNameInputChange}></input>
        </div>
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" onChange={handleUserEmailInputChange}></input>
      </div>
      <div>
        <label htmlFor="phone">Nr telefonu: </label>
        <input type="text" id="phone" onChange={handleUserPhoneNumberInputChange}></input>
      </div>
      <div>
        <label htmlFor="zip">Kod pocztowy: </label>
        <input type="text" id="zip" onChange={handleUserZipCodeInputChange}></input>
      </div>
      <div>
        <label htmlFor="address">Adres: </label>
        <input type="text" id="address" onChange={handleUserAddressInputChange}></input>
      </div>
    </div>
  )
}

export default CheckoutForm