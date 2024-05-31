import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { loadStripe } from '@stripe/stripe-js';
import Nav from '../Components/navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StripeCheckout from 'react-stripe-checkout';

const stripePromise = loadStripe('pk_test_51PGywdBwqNocB2yIgRUhTOxCLUXifycb47usxmBwsizanJt9hIuwOLGasezA5xeXFukFgxT4UPmcqTRPl8ekCh3M00GL7hsLNh');

const OrderForm = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [productName, setProductName] = useState(location.state?.productName || '');
  const [customerName, setCustomerName] = useState('');
  const [userId, setUserId] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [booking, setBooking] = useState({
    name: "Order the Product",
    price: 1500 
  });
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setCustomerName(decodedToken.userName); // Adjust based on your token structure
      setUserId(decodedToken.id); // Adjust based on your token structure
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://oasis-final-directory.onrender.com/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          customerName,
          address,
          phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order.');
      }

      const data = await response.json();
      toast.success('Order placed successfully! Please proceed with the payment.', { position: 'bottom-right' });
      setOrderData(data);
      setOrderPlaced(true);
      setPaymentProcessed(true); // Allow payment processing
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order.', { position: 'bottom-right' });
    }
  };

  const handleToken = async (token) => {
    try {
      const response = await fetch('http://oasis-final-directory.onrender.com/booking/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, orderData }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const data = await response.json();
      toast.success('Payment Successful!', { position: 'bottom-right' });

      const addToDashboardResponse = await fetch('http://oasis-final-directory.onrender.com/booking/payment/success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: data.orderId, userId: data.userId }),
      });

      if (!addToDashboardResponse.ok) {
        throw new Error('Failed to add order to dashboard');
      }

      toast.success('Order added to your dashboard!', { position: 'bottom-right' });
      navigate('/');
    } catch (error) {
      toast.error('Payment failed. Please try again.', { position: 'bottom-right' });
      console.error('Payment error:', error);
    }
  };

  return (
    <div>
      <Nav />
      <div className='container1'>
        <div style={{ textAlign: 'center', marginTop: '20px' }} className='container'>
          <h2>Order Form</h2>
          <p>Product: {productName}</p>
          <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
            <div style={{ marginBottom: '10px' }}>
              <label>Customer Name:</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                style={{ padding: '10px', width: '100%', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{ padding: '10px', width: '100%', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Phone Number:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                style={{ padding: '10px', width: '100%', marginTop: '5px' }}
              />
            </div>
            <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Place Order</button>
          </form>
          <ToastContainer />
        </div>
      </div>
      {paymentProcessed && (
        <div className="container" style={{ textAlign: 'center', marginTop: '20px' }}>
          <StripeCheckout
            stripeKey="pk_test_51PGywdBwqNocB2yIgRUhTOxCLUXifycb47usxmBwsizanJt9hIuwOLGasezA5xeXFukFgxT4UPmcqTRPl8ekCh3M00GL7hsLNh"
            token={handleToken}
            name="Order Payment"
            amount={booking.price * 100} 
          >
            <button className="btn btn-success mt-4">Confirm Payment</button>
          </StripeCheckout>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
