
import React, { useState, useEffect } from 'react';
import Nav from './count';

const PRODUCTS_PER_PAGE = 10;

const AdminProductTable = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://oasis-final-directory.onrender.com/products/all');
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

    fetchProducts();
  }, []);

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

  return (
    <div className="user-table-container" >
      <Nav />
      <header className="user-table-container" >
        {/* <h1 style={{ fontSize: '90px', textAlign: 'center', fontWeight: 'bold', color: '#0e0737' }}>Admin - Products</h1> */}
      </header>
      <table className="user-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.productName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>LKR {product.price}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <img src={product.imageUrl} alt={product.productName} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default AdminProductTable;
