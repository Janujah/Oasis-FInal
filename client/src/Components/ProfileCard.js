// src/components/ProfileCard.js
import React from 'react';
import '../CSS/ProfileCard.css'; // Import the CSS for styling

function ProfileCard({ name, specialty, imageUrl }) {
    return (
        <div className="profile-card">
            <img src={imageUrl} alt={name} className="profile-image" />
            <div className="profile-info">
                <h3>{name}</h3>
                <p style={{textDecoration:'none'}}>{specialty}</p>
            </div>
        </div>
    );
}

export default ProfileCard;
