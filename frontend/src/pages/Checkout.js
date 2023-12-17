import { useEffect } from "react"
import { useAddressesContext } from "../hooks/useAddressesContext"
import Navbar from '../components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

import PaymentForm from '../components/PaymentHandlerPharmacy';

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
  const [isOpen, setOpen] = useState(false);

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
    <div className="row">
          <div className="title-section text-center col-12">
            <h2 className="text-uppercase">Checkout</h2>
          </div>
        </div>  

         <div className={`col-lg-6 ${isOpen ? 'show' : ''}`}>
      <h3 className="mb-3 h6 text-uppercase text-black d-block">Choose Address</h3>
      <button
        onClick={() => setOpen(!isOpen)}
        type="button"
        className="btn btn-secondary btn-md dropdown-toggle px-4"
        id="dropdownMenuReference"
        data-toggle="dropdown"
      >
         Filter
      </button>
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuReference">
      {user && addresses && addresses.map(address => (
            <a
              key={address}
              className="dropdown-item"
              href="#"
              onClick={() => {
                setaddress(address);
              }}
            >
              {address}
            </a>
          ))}
      </div>
    </div>
    <div className="title-section text-center col-12">
        {price && (<div> <h3>Total Price: {price} </h3> </div>)}
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