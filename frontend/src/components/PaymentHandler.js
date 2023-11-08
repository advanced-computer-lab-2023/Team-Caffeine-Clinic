import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/create-payment-intent?amount=200', {
        method: 'POST',
    })

    if(!response.ok){

    }

    const json = response.json
    setClientSecret(json)

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
