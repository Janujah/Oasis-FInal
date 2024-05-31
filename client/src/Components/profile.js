// Profile.js
import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
// import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; // Adjust based on your token's structure

        fetch(`http://localhost:3001/SignUp/view/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log('Response status:', response.status); // Log status
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
          })
          .then(text => {
            console.log('Response text:', text); // Log raw response text
            try {
              const data = JSON.parse(text);
              console.log('Parsed data:', data); // Log parsed data
              setUser(data);
            } catch (err) {
              throw new Error('Failed to parse JSON');
            }
          })
          .catch(error => {
            console.error('There was an error fetching the user data!', error);
            setError('Could not fetch user data');
          });
      } catch (error) {
        console.error('Invalid token', error);
        setError('Invalid token');
      }
    } else {
      setError('No token found');
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="profile-pic.jpg" alt="User Profile" className="profile-pic" />
        <h1 className="username">{user.userName}</h1>
        <p className="role">Role: {user.role}</p>
      </div>
      <div className="profile-details">
        <h2>Profile Details</h2>
        <p><strong>Full Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
        {user.role === 'doctor' && <p><strong>Specialization:</strong> {user.specialization}</p>}
        <p><strong>Medical History:</strong> {user.medicalHistory}</p>
      </div>
    </div>
  );
};

export default Profile;
