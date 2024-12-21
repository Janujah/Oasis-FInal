import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { data: clientSecret } = await axios.post('http://localhost:3001/create-payment-intent', { email });

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          email: email,
          name: name,
        },
      },
    });

    if (error) {
      console.log(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!');
    }
    setLoading(false);
  };

  return (
    <div className='container1'>
    <div className="form" style={{backgroundColor:'white'}}>
      <div className="payment-details">
        <h3>Payment Amount</h3>
        <p>LKR1500.00</p>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <CardElement />
        <button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default CheckoutForm;
