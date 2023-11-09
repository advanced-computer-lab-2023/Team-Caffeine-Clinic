import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = ({ amount, wallet, onPaymentResult }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);
  
  useEffect(() => {
    console.log(onPaymentResult);
    console.log(amount);
    const fetchClientSecret = async () => {
        const url = `/api/create-payment-intent?amount=${amount}`

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

  const wallet = async () => {

  }

  const creditCard = async () => {

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setError(error.message);

      setPaymentResult('Payment failed');
        // Call the callback function with the payment result
        if (onPaymentResult) {
          onPaymentResult('Payment failed');
        }

    } else if (paymentIntent.status === 'succeeded') {
        setPaymentResult('Payment succeeded');

        if (onPaymentResult) {
          onPaymentResult('Payment succeeded');
        }

        console.log('payment confirmed');
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
      {error && <div>{error}</div>}
    </form>
    </div>
    </div>
  );
};

export default PaymentForm;
