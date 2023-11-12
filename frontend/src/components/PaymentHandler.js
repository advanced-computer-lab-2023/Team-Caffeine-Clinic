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
  const [loadingWallet, setLoadingWallet] = useState(true); // New state variable


  useEffect(() => {
    // Fetch wallet data
    console.log('na3am');
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
      } catch (err) {
        // Handle error
        setError(err)
      } finally {
        // Set loadingWallet to false regardless of success or failure
        setLoadingWallet(false);
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
          }
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
    console.log(wallet);
    if (amount > wallet.wallet) {
      setError('Not Enough in Wallet');
    } else {
      try {
        let response;
        if(username){
          response = await fetch(`/api/patient/payWithWallet?amount=${amount}&doctorUsername=${username}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          });
      }
        else{
          response = await fetch(`/api/patient/healthPackagePayWithWallet?amount=${amount}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          })
        }
        // Handle response
        if(response.ok && onPaymentResult){
          window.alert('Payment Successful');
          onPaymentResult();
        }
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

    } else if (paymentIntent.status === 'succeeded') {
      setPaymentResult('Payment succeeded');

      if (onPaymentResult) {
        //onPaymentResult();
        console.log(username);
        if(username){
          const addToDoctorWalletResponse = await fetch(`/api/updateDoctorWallet?amount=${amount}&doctorUsername=${username}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
         console.log(addToDoctorWalletResponse.ok);
          if(addToDoctorWalletResponse.ok){
            console.log('ana hena');
            window.alert('Payment Successful');
            onPaymentResult();
            setError('Payment Successful')
          }
        }

        else{
          window.alert('Payment Successful');
          onPaymentResult()
        }
      }

      console.log('payment confirmed');
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        {loadingWallet && <div>Loading wallet...</div>}
        {!loadingWallet && !showCardElement && (
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

        <Link to='/doctors'>
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentForm;
