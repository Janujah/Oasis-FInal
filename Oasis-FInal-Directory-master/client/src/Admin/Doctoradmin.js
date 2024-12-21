import React, { useState, useEffect } from 'react';
import Navbar from './count';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [editFormData, setEditFormData] = useState(null);

    useEffect(() => {
        fetchUsers();

    }, []);

    const fetchUsers = () => {
        fetch('https://oasis-final-directory.onrender.com/Doctors/view')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => {
                console.error('Failed to fetch users:', error);
                alert('Failed to load users.');
            });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

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

    const verifyUser = (id) => {
        fetch(`https://oasis-final-directory.onrender.com/Doctors/verify/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                alert('User verified successfully');
                fetchUsers();
            })
            .catch(error => {
                console.error('Error verifying user:', error);
                alert(`Failed to verify the user: ${error.message}`);
            });
    };

    const deleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            fetch(`https://oasis-final-directory.onrender.com/Doctors/delete/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    alert(data.message || 'User deleted successfully');
                    fetchUsers();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to delete the user.');
                });
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

    const submitEditForm = () => {
        if (!editFormData || !editFormData._id) {
            alert('Error: No user data to update.');
            return;
        }

        fetch(`https://oasis-final-directory.onrender.com/Doctors/update/${editFormData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editFormData),
        })
            .then(response => response.json())
            .then(() => {
                alert('User updated successfully');
                fetchUsers();
                closeEditModal();
            })
            .catch(error => {
                console.error('Error updating user:', error);
                alert('Failed to update user.');
            });
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registered ID</th>
                            <th>Working Hospitals</th>
                            <th>Age</th>
                            <th>Contact No</th>
                            <th>Position</th>
                            <th>Profile Image</th>
                            {/* <th>Signature Image</th> */}
                            <th>Actions</th>
                            <th>Verification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(user => (
                            <tr key={user._id}>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.registeredId}</td>
                                <td>{user.workingHospitals}</td>
                                <td>{user.age}</td>
                                <td>{user.contactNo}</td>
                                <td>{user.position}</td>
                                <td>
                                    <img src={user.profileImage} alt="Profile" style={{ width: "50px", height: "50px" }} />
                                </td>
                                {/* <td>
                                    <img src={user.signatureImage} alt="Signature" style={{ width: "50px", height: "50px" }} />
                                </td> */}
                                <td>
                                    <button onClick={() => openEditModal(user)}>Edit</button>
                                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                                </td>
                                <td>
                                    {user.isVerified ? 'Verified' : <button onClick={() => verifyUser(user._id)}>Verify</button>}
                                </td>
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

