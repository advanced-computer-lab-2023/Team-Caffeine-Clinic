import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchClientSecret = async () => {
        const url = '/api/create-payment-intent?amount=200'

        const response = await fetch(url, {
            method: 'POST',
        })
    
        if(!response.ok){
    
        }
    
        const json = await response.json()
        //console.log(json.clientSecret);
        setClientSecret(json.clientSecret)
    }
    fetchClientSecret()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === 'succeeded') {
        console.log('payment confirmed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default PaymentForm;
