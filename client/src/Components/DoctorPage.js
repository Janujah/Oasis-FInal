import React, { useState, useEffect } from 'react';
import Nav from './navbar';
import { Link } from 'react-router-dom';

const DOCTORS_PER_PAGE = 10;

function DoctorPage() {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch('http://oasis-final-directory.onrender.com/Doctors/view')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const verifiedDoctors = data.filter(doctor => doctor.isVerified); // Filter to only include verified doctors
                setDoctors(verifiedDoctors);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
                setError('Failed to load doctors.');
            });
    }, []);

    if (error) {
        return (
            <div>
                <Nav />
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>{error}</h2>
            </div>
        );
    }

    const totalDoctors = doctors.length;
    const totalPages = Math.ceil(totalDoctors / DOCTORS_PER_PAGE);
    const startIndex = (currentPage - 1) * DOCTORS_PER_PAGE;
    const currentDoctors = doctors.slice(startIndex, startIndex + DOCTORS_PER_PAGE);

    return (
        <div>
            <Nav />
            <header className="doctor-header">
                <h1 style={{ fontSize: '90px', textAlign: 'center', fontWeight: 'bold', color: '#0e0737' }}>Doctors</h1>
            </header>
            <div className="doctor-grid">
                {currentDoctors.map(doctor => (
                    <Link to={`/profile/${doctor._id}`} className="doctor-link" key={doctor._id}>
                        <div className="doctor-card" style={{ margin: '10px', border: '1px solid #ccc', padding: '20px', width: '300px' }}>
                            <img src={doctor.profileImage} alt={doctor.fullName} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <h3>{doctor.fullName}</h3>
                            <p>{doctor.position}</p>
                            {doctor.isVerified && <span style={{ color: 'green', fontWeight: 'bold' }}>Verified</span>}
                            <p>{doctor.bio}</p>
                        </div>
                    </Link>
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
                {`${startIndex + 1}-${Math.min(startIndex + DOCTORS_PER_PAGE, totalDoctors)} of ${totalDoctors} doctors`}
            </div>
        </div>
    );
}

export default DoctorPage;
