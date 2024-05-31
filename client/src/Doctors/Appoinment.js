import React, { useState, useEffect } from 'react';
import Navbar from '../Components/nav'; // Ensure the component import matches the actual file name and path.
import {jwtDecode} from 'jwt-decode';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // This does not change, so no setter is needed.
    const [editFormData, setEditFormData] = useState(null);
    const [doctorName, setDoctorName] = useState('');

    useEffect(() => {
        // Extract the username from the JWT token
        const token = localStorage.getItem('auth-token'); // Assuming you store your token in localStorage
        if (token) {
            const decodedToken = jwtDecode(token);
            setDoctorName(decodedToken.userName); // Adjust based on your token's structure
        }

        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3001/consult/view');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                alert('Failed to load users.');
            }
        };

        fetchUsers();

        const newSocket = new WebSocket('ws://localhost:3001');
        newSocket.onmessage = (event) => {
            setUsers(JSON.parse(event.data));
        };
        return () => newSocket.close();
    }, []);

    const filteredUsers = users.filter(user => user.doctorName === doctorName);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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

    const verifyUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/consult/verify/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('User verified successfully');
            setUsers(prevUsers => prevUsers.map(user => 
                user._id === id ? { ...user, isVerified: true } : user
            ));
        } catch (error) {
            console.error('Error verifying user:', error);
            alert(`Failed to verify the user: ${error.message}`);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost:3001/consult/delete/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                alert(data.message || 'User deleted successfully');
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to delete the user.');
            }
        }
    };

    const openEditModal = (user) => {
        setEditFormData(user);
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
            alert('Error: No user data to update.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/consult/update/${editFormData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editFormData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('User updated successfully');
            setUsers(prevUsers => prevUsers.map(user => 
                user._id === editFormData._id ? { ...user, ...editFormData } : user
            ));
            closeEditModal();
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user.');
        }
    };

    return (
        <div className="user-management-container">
            <Navbar />
            {editFormData && (
                <div className="edit-modal">
                    <form onSubmit={submitEditForm}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={editFormData.fullName || ''}
                            onChange={handleEditFormChange}
                        />
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={editFormData.email || ''}
                            onChange={handleEditFormChange}
                        />
                        <label>Registered ID:</label>
                        <input
                            type="text"
                            name="registeredId"
                            value={editFormData.registeredId || ''}
                            onChange={handleEditFormChange}
                        />
                        <label>Working Hospitals:</label>
                        <input
                            type="text"
                            name="workingHospitals"
                            value={editFormData.workingHospitals || ''}
                            onChange={handleEditFormChange}
                        />
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={editFormData.age || ''}
                            onChange={handleEditFormChange}
                        />
                        <label>Contact No:</label>
                        <input
                            type="text"
                            name="contactNo"
                            value={editFormData.contactNo || ''}
                            onChange={handleEditFormChange}
                        />
                        <label>Bio:</label>
                        <textarea
                            name="bio"
                            value={editFormData.bio || ''}
                            onChange={handleEditFormChange}
                        />
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => setEditFormData(null)}>Cancel</button>
                    </form>
                </div>
            )}
            <div className="user-table-container">
                <table className="user-table">
                <thead>
    <tr>
        <th>Doctor Name</th>
        <th>Full Name</th>
        {/* <th>Date of Birth</th> */}
        <th>Gender</th>
        {/* <th>Email</th> */}
        <th>Phone</th>
        <th>Consultation Reason</th>
        <th>Preferred Date</th>
        <th>Preferred Time</th>
        <th>Preferred Language</th>
        {/* <th>Visited Before</th> */}
        {/* <th>Consent Given</th> */}
        <th>Date</th>
        {/* <th>Verified</th> */}
        {/* <th>Actions</th> */}
    </tr>
</thead>

{/* // Inside the <tbody> section */}
<tbody>
    {currentItems.map(booking => (
        <tr key={booking._id}>
            <td>{booking.doctorName}</td>
            <td>{booking.fullName}</td>
            {/* <td>{new Date(booking.dob).toLocaleDateString()}</td> */}
            <td>{booking.gender}</td>
            {/* <td>{booking.email}</td> */}
            <td>{booking.phone}</td>
            <td>{booking.consultationReason}</td>
            <td>{new Date(booking.preferredDate).toLocaleDateString()}</td>
            <td>{booking.preferredTime}</td>
            <td>{booking.preferredLanguage}</td>
            {/* <td>{booking.visitedBefore ? "Yes" : "No"}</td> */}
            {/* <td>{booking.consent ? "Yes" : "No"}</td> */}
            <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
            {/* <td>{booking.isVerified ? "Verified" : <button onClick={() => verifyBooking(booking._id)}>Verify</button>}</td> */}
            {/* <td> */}
                {/* <button onClick={() => openEditModal(booking)}>Edit</button> */}
                {/* <button onClick={() => deleteBooking(booking._id)}>Delete</button> */}
            {/* </td> */}
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

export default UserTable;
