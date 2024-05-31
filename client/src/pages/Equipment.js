import React, { useState, useEffect } from 'react';
import Nav from '../Components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PRODUCTS_PER_PAGE = 10;

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://oasis-final-directory.onrender.com/products/all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products.');
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [searchQuery, products]);

    if (error) {
        return (
            <div>
                <Nav />
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>{error}</h2>
            </div>
        );
    }

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    const handleOrderClick = (productId, productName) => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id; // Adjust based on your token structure
            navigate(`/order/${productId}`, { state: { productName } });
        } else {
            navigate('/login'); // Redirect to login if not authenticated
        }
    };

    return (
        <div>
            <Nav />
            <header className="product-header">
                <h1 style={{ fontSize: '90px', textAlign: 'center', fontWeight: 'bold', color: '#0e0737' }}>Products</h1>
            </header>
            <div style={{ textAlign: 'center', margin: '20px' }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        width: '300px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
            </div>
            <div className="product-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {currentProducts.map(product => (
                    <div key={product._id} className="product-card" style={{ margin: '10px', border: '1px solid #ccc', padding: '20px', width: '300px' }}>
                        <Link to={`/product/${product._id}`} className="product-link" style={{ textDecoration: 'none', color: 'black' }}>
                            <img src={product.imageUrl} alt={product.productName} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <h3>{product.productName}</h3>
                            <p>Price: LKR {product.price}</p>
                        </Link>
                        <button onClick={() => handleOrderClick(product._id, product.productName)} style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}>
                            Order
                        </button>
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
}

export default ProductPage;
