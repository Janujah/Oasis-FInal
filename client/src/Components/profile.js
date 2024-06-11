import React, { useState, useEffect } from 'react';
import Navbar from '../Components/navbar';
import { jwtDecode } from 'jwt-decode';

function OrderTable() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const decodedToken = jwtDecode(token);
                const username = decodedToken.userName;

                const response = await fetch('https://oasis-final-directory.onrender.com/order/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const userOrders = data.filter(order => order.customerName === username);
                setOrders(userOrders);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                alert('Failed to load orders.');
            }
        };

        fetchOrders();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        return [...Array(totalPages).keys()].map((number) => (
            <button key={number + 1} onClick={() => handlePageChange(number + 1)} disabled={currentPage === number + 1}>
                {number + 1}
            </button>
        ));
    };

    return (
        <div className="order-table-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Product Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((order) => (
                        <tr key={order._id}>
                            <td>{order.customerName}</td>
                            <td>{order.productName}</td>
                            <td>{order.address}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {renderPageNumbers()}
            </div>
        </div>
    );
}

function ConsultationTable() {
    const [consultations, setConsultations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [editFormData, setEditFormData] = useState(null);

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const decodedToken = jwtDecode(token);
                const username = decodedToken.userName;

                const response = await fetch('https://oasis-final-directory.onrender.com/consult/view', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                const userConsultations = data.filter(consultation => consultation.fullName === username);
                setConsultations(userConsultations);
            } catch (error) {
                console.error('Failed to fetch consultations:', error);
                alert('Failed to load consultations.');
            }
        };

        fetchConsultations();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = consultations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(consultations.length / itemsPerPage);

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        return [...Array(totalPages).keys()].map(number => (
            <button key={number + 1} onClick={() => handlePageChange(number + 1)} disabled={currentPage === number + 1}>
                {number + 1}
            </button>
        ));
    };

    const openEditModal = (consultation) => {
        setEditFormData(consultation);
    };

    const closeEditModal = () => {
        setEditFormData(null);
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitEditForm = async (event) => {
        event.preventDefault();
        if (!editFormData || !editFormData._id) {
            alert('Error: No consultation data to update.');
            return;
        }

        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`https://oasis-final-directory.onrender.com/consult/update/${editFormData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editFormData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Consultation updated successfully');
            setConsultations(prevConsultations => prevConsultations.map(consultation => 
                consultation._id === editFormData._id ? { ...consultation, ...editFormData } : consultation
            ));
            closeEditModal();
        } catch (error) {
            console.error('Error updating consultation:', error);
            alert('Failed to update consultation.');
        }
    };

    return (
        <div className="consultation-table-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Doctor Name</th>
                        <th>Full Name</th>
                        <th>Consultation Reason</th>
                        <th>Preferred Date</th>
                        <th>Preferred Time</th>
                        <th>Preferred Language</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(consultation => (
                        <tr key={consultation._id}>
                            <td>{consultation.doctorName}</td>
                            <td>{consultation.fullName}</td>
                            <td>{consultation.consultationReason}</td>
                            <td>{new Date(consultation.preferredDate).toLocaleDateString()}</td>
                            <td>{consultation.preferredTime}</td>
                            <td>{consultation.preferredLanguage}</td>
                            <td>{new Date(consultation.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {renderPageNumbers()}
            </div>
        </div>
    );
}

function UserTable() {
    const [showOrders, setShowOrders] = useState(true);

    return (
        <div className="user-management-container">
            <Navbar />
            <div className="toggle-buttons"><br/>
                <button onClick={() => setShowOrders(true)} disabled={showOrders}>Show Orders</button>
                <button onClick={() => setShowOrders(false)} disabled={!showOrders}>Show Consultations</button>
            </div>
            {showOrders ? <OrderTable /> : <ConsultationTable />}
        </div>
    );
}

export default UserTable;
