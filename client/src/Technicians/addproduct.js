import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';


const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [productAdded, setProductAdded] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch user information from JWT token
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserEmail(decodedToken.email);
        setUserName(decodedToken.userName);
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
  }, []);

  const handleAddProduct = async () => {
    try {
      if (!productName || !price || !image || !userEmail || !userName) {
        throw new Error('Please fill all fields');
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', parseFloat(price));
      formData.append('image', image);
      formData.append('userEmail', userEmail);
      formData.append('userName', userName);

      const response = await fetch('http://localhost:3001/products/add', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      console.log('Product added successfully:', result);

      toast.success('Product added successfully!');

      // Reset form fields
      setProductName('');
      setPrice('');
      setImage(null);
      setImagePreview(null);

      // Set productAdded to true to trigger redirection
      setProductAdded(true);
    } catch (error) {
      toast.error(`Error adding product: ${error.message}`);
      console.error('Error adding product:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Redirect to home page if productAdded is true
  if (productAdded) {
    return <Link to="/Technicians">Go to Home Page</Link>;
  }

  return (
    <div className="container1">
      <div className="container">
        <h2>Add Product</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          /><br /><br />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          /><br /><br />
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            required
          /><br /><br />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Image Preview" />
            </div>
          )}
          <label htmlFor="userEmail">User Email:</label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            readOnly
          /><br /><br />
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            readOnly
          /><br /><br />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

