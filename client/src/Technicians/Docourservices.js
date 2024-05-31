import React, { useState, useEffect } from 'react';
import Nav from '../Components/technav';
import{ jwtDecode }from 'jwt-decode';

const PRODUCTS_PER_PAGE = 10;

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Decode the token and extract the username
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.userName) {
          setUserName(decodedToken.userName);
          fetchProducts(decodedToken.userName);
        } else {
          setError('User not authenticated.');
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
        setError('Failed to decode token.');
      }
    } else {
      setError('User not authenticated.');
    }
  }, []);

  const fetchProducts = async (userName) => {
    try {
      const response = await fetch(`http://oasis-final-directory.onrender.com/Products/user/${userName}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products.');
    }
  };

  if (error) {
    return (
      <div>
        <Nav />
        <h2 style={{ textAlign: 'center', marginTop: '20px' }}>{error}</h2>
      </div>
    );
  }

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handleOrder = (productId) => {
    // Handle order logic here
    console.log('Order placed for product:', productId);
  };

  return (
    <div>
      <Nav />
      <header className="doctor-header">
        <h1 style={{ fontSize: '90px', textAlign: 'center', fontWeight: 'bold', color: '#0e0737' }}>Products</h1>
      </header>
      <div className="doctor-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {currentProducts.map(product => (
          <div key={product._id} className="doctor-card" style={{ margin: '10px', border: '1px solid #ccc', padding: '20px', width: '300px' }}>
            <img src={product.imageUrl} alt={product.productName} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h3>{product.productName}</h3>
            <p>Price: LKR{product.price}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              margin: '0 5px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: currentPage === index + 1 ? '#0e0737' : '#fff',
              color: currentPage === index + 1 ? '#fff' : '#000',
              border: '1px solid #0e0737',
              borderRadius: '5px'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '16px' }}>
        {`${startIndex + 1}-${Math.min(startIndex + PRODUCTS_PER_PAGE, totalProducts)} of ${totalProducts} products`}
      </div>
    </div>
  );
};

export default ProductCard;


