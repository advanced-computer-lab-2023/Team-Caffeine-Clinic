import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useAuthContext } from '../hooks/useAuthContext';

const PaymentForm = ({ username, amount, onPaymentResult }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [showCardElement, setShowCardElement] = useState(false); // New state variable
  const { user } = useAuthContext();

  useEffect(() => {
    // Fetch wallet data
    const fetchWallet = async () => {
      try {
        const response = await fetch('/api/patient/getWallet', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWallet(data);
      } catch (error) {
        // Handle error
      }
    };

    if (user) {
      fetchWallet();
    }
  }, [user]);

  useEffect(() => {
    // Fetch client secret
    const fetchClientSecret = async () => {
      const url = `/api/create-payment-intent?amount=${amount}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You might need to include additional headers like authorization tokens here
        },
        body: JSON.stringify({username} ),
      });

      if (!response.ok) {
        // Handle error
      }

      const json = await response.json();
      setClientSecret(json.clientSecret);
    };

    fetchClientSecret();
  }, [amount]);

  const handleWallet = async () => {
    if (amount > wallet.wallet) {
      setError('Not Enough in Wallet');
    } else {
      try {
        const response = await fetch(`/api/patient/payWithWallet?amount=${amount}&doctorUsername=${username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });

        // Handle response
      } catch (error) {
        setError(error);
      }
    }
  };

  const handleCreditCard = async () => {
    // Set the state to show the credit card form
    setShowCardElement(true);
  };

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
        {!showCardElement && (
          <>
            <button onClick={handleWallet} className="pay-button">Pay with Wallet</button>
            <button onClick={handleCreditCard} className="pay-button">Pay with Credit Card</button>
            {error && <div className="error-message">{error}</div>}
          </>
        )}

        {showCardElement && (
          <div className="payment-form-container">
          <form className="payment-form" onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" className="pay-button">Pay</button>
          </form>
          </div>
        )}
        <Link to='/doctors'> <button>Cancel</button> </Link>
      </div>
    </div>
  );
};

export default PaymentForm;
