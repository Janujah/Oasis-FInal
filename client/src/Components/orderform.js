import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Nav from '../Components/navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderForm = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [productName, setProductName] = useState(location.state?.productName || '');
  const [customerName, setCustomerName] = useState('');
  const [userId, setUserId] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setCustomerName(decodedToken.userName);
      setUserId(decodedToken.id); 
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://oasis-final-directory.onrender.com/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          userId,
          customerName,
          address,
          phoneNumber,
        }),
      });
      if (response.ok) {
        toast.success('Order placed successfully!', { position: 'bottom-right' });
      } else {
        toast.error('Failed to place order.', { position: 'bottom-right' });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order.', { position: 'bottom-right' });
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
                disabled
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
    </div>
  );
};

export default OrderForm;



