import { useEffect } from "react"
import { useAddressesContext } from "../hooks/useAddressesContext"
import Navbar from '../components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

import PaymentForm from '../components/PaymentHandler';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51OABYlCDYNw0lbpN84PaD596nbIQM1GoWS1g6brg1wQxkm60xMam3ZKRANUdIzjK503IMzQ4TkFheaYGWMHcHZvS00wD6HxMit');

// components

const Checkout = () => {
  const {addresses, dispatch} = useAddressesContext()
  const {user} = useAuthContext()
  const [address,setaddress] = useState('')
  const [error, setError] = useState(null)
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [price, setPrice] = useState(null)

  const openPopup = () => {
    setPopupOpen(true);
  };

  useEffect(() => {
    const fetchCartPrice = async () => {
      try {
        const response = await fetch('/api/patient/getCartPrice', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${user.token}`
            }
        })
        const data = await response.json()

        if(!response.ok){
          setError(`Can't Get Price`)
        }
        else{
          console.log(data);
          setPrice(data)
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchCartPrice()
  }, [user])

  useEffect(() => {
    const fetchAdresses = async () => {
      try{
        const response = await fetch('/api/patient/deliveryaddresses',{
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
          dispatch({type: 'SET_ADDRESS', payload: json})
        }
      }
      catch(error){
        console.log(error);
      }
    }

    fetchAdresses()
  }, [dispatch,user])

  const Order = async () => {
    if(address!=''){
        const input = {address}

        const response = await fetch('/api/patient/neworder', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
        })
        const json = await response.json()

        if (!response.ok) {
        setError(json.error)
        }
        if (response.ok) {
        setError(null)
        setaddress('')
        window.open(`/Orders`,'_self');
        }
    }
    else{
        setError("Please Choose a delivery address")
    }
  }

  return (
    <>
    <header>
        <Navbar />
    </header>
    <div className="home">
        <div className="workouts">
            <p>Select address of delivery</p>
            {user && addresses && addresses.map(address => (
            <div>
                <input type="radio" name="address" value={address} id={address} onChange={(e) => setaddress(e.target.value)} ></input>
                <label for={address}>{address}</label>
            </div>
            ))}
        </div>
        <p>{address}</p>
        {price && (<div> <h3>Total Price: </h3> {price} </div>)}
        <button onClick={openPopup}> Order </button> 
        {error && <div className="error">{error}</div>}
    </div>
    {isPopupOpen && (
            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={price}
                onPaymentResult={() => Order()}
              />
            </Elements>
          )}
    </>
  )
}

export default Checkout