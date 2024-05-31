
import React, { useState, useEffect } from 'react';
import Navbar from './count';
// import './UserTable.css';

function PaymentTable() {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        fetchUserDetails();
        fetchPayments();
    }, []);

    const fetchUserDetails = () => {
        const token = localStorage.getItem('auth-token'); // Assuming token is stored in local storage
        if (token) {
            fetch('https://oasis-final-directory.onrender.com/user/details', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUserName(data.name);
                    setUserId(data._id);
                })
                .catch(error => {
                    console.error('Failed to fetch user details:', error);
                    alert('Failed to load user details.');
                });
        }
    };

    const fetchPayments = () => {
        fetch('https://oasis-final-directory.onrender.com/stripe/payments')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched payments data:', data); // Log the fetched data
            if (Array.isArray(data)) {
                setPayments(data);
            } else {
                console.error('Fetched payments data is not an array:', data);
                alert('Failed to load payments.');
            }
        })
        .catch(error => {
            console.error('Failed to fetch payments:', error);
            alert('Failed to load payments.');
        });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(payments.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers.map(number => (
            <button key={number} onClick={() => handlePageChange(number)} disabled={currentPage === number}>
                {number}
            </button>
        ));
    };

    return (
        <div className="user-management-container">
            <Navbar />
            <div className="user-table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Charge ID</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Description</th>
                            <th>Receipt Email</th>
                            <th>Status</th>
                            <th>Created At</th>
                            {/* <th>Shipping Name</th> */}
                            {/* <th>Shipping Country</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(payment => (
                            <tr key={payment.id}>
                                <td>{payment.customer}</td>
                                <td>{payment.id}</td>
                                <td>{(payment.amount / 100).toFixed(2)}</td>
                                <td>{payment.currency.toUpperCase()}</td>
                                <td>{payment.description}</td>
                                <td>{payment.receipt_email}</td>
                                <td>{payment.status}</td>
                                <td>{new Date(payment.created * 1000).toLocaleString()}</td>
                                {/* <td>{userName || userId}</td> */}
                                {/* <td>{payment.shipping?.address?.country}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {renderPageNumbers()}
                </div>
            </div>
        </div>
    );
}

export default PaymentTable;


// import React, { useState, useEffect } from 'react';
// import Navbar from './count';
// // import './UserTable.css';

// function PaymentTable() {
//     const [payments, setPayments] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);

//     useEffect(() => {
//         fetchPayments();
//     }, []);

//     const fetchPayments = () => {
//         fetch('https://oasis-final-directory.onrender.com/stripe/payments-with-users')
//             .then(response => response.json())
//             .then(data => setPayments(data))
//             .catch(error => {
//                 console.error('Failed to fetch payments:', error);
//                 alert('Failed to load payments.');
//             });
//     };

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(payments.length / itemsPerPage);

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const renderPageNumbers = () => {
//         const pageNumbers = [];
//         for (let i = 1; i <= totalPages; i++) {
//             pageNumbers.push(i);
//         }
//         return pageNumbers.map(number => (
//             <button key={number} onClick={() => handlePageChange(number)} disabled={currentPage === number}>
//                 {number}
//             </button>
//         ));
//     };

//     return (
//         <div className="user-management-container">
//             <Navbar />
//             <div className="user-table-container">
//                 <table className="user-table">
//                     <thead>
//                         <tr>
//                             <th>Customer ID</th>
//                             <th>Charge ID</th>
//                             <th>Amount</th>
//                             <th>Currency</th>
//                             <th>Description</th>
//                             <th>Receipt Email</th>
//                             <th>Status</th>
//                             <th>Created At</th>
//                             <th>User Name</th>
//                             <th>User Email</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentItems.map(payment => (
//                             <tr key={payment.id}>
//                                 <td>{payment.customer}</td>
//                                 <td>{payment.id}</td>
//                                 <td>{(payment.amount / 100).toFixed(2)}</td>
//                                 <td>{payment.currency.toUpperCase()}</td>
//                                 <td>{payment.description}</td>
//                                 <td>{payment.receipt_email}</td>
//                                 <td>{payment.status}</td>
//                                 <td>{new Date(payment.created * 1000).toLocaleString()}</td>
//                                 <td>{payment.user ? payment.user.name : 'N/A'}</td>
//                                 <td>{payment.user ? payment.user.email : 'N/A'}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div className="pagination">
//                     {renderPageNumbers()}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PaymentTable;
