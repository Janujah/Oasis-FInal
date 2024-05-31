import React, { useState, useEffect } from 'react';
import Nav from '../Components/navbar';
import { Link } from 'react-router-dom';

const DOCTORS_PER_PAGE = 10;

function SearchableDropdown({ options, onSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOptionClick = (option) => {
        setSearchTerm(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block', width: '300px' }}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={() => setIsOpen(!isOpen)}
                placeholder="Search and select a position"
                style={{ fontSize: '20px', padding: '10px', width: '100%' }}
            />
            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        maxHeight: '200px',
                        overflowY: 'auto',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        zIndex: 1,
                    }}
                >
                    {filteredOptions.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                backgroundColor: option === searchTerm ? '#eee' : '#fff',
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function DoctorPage() {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch('http://localhost:3001/Doctors/view')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const verifiedDoctors = data.filter(doctor => doctor.isVerified); // Filter to only include verified doctors
                setDoctors(verifiedDoctors);
                console.log('Verified doctors fetched:', verifiedDoctors);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
                setError('Failed to load doctors.');
            });
    }, []);

    const handlePositionSelect = (position) => {
        setSelectedPosition(position);
        setCurrentPage(1); // Reset to first page whenever a new position is selected
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page whenever a new search term is entered
    };

    const positions = [...new Set(doctors.map(doctor => doctor.position))]; // Get unique positions

    const filteredDoctors = doctors.filter(doctor => {
        const matchesPosition = selectedPosition ? doctor.position === selectedPosition : true;
        const matchesSearchTerm = doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesPosition && matchesSearchTerm;
    });

    const totalDoctors = filteredDoctors.length;
    const totalPages = Math.ceil(totalDoctors / DOCTORS_PER_PAGE);
    const startIndex = (currentPage - 1) * DOCTORS_PER_PAGE;
    const currentDoctors = filteredDoctors.slice(startIndex, startIndex + DOCTORS_PER_PAGE);

    if (error) {
        return (
            <div>
                <Nav />
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>{error}</h2>
            </div>
        );
    }

    return (
        <div>
            <Nav />
            <header className="doctor-header">
                <h1 style={{ fontSize: '90px', textAlign: 'center', fontWeight: 'bold', color: '#0e0737' }}>Doctors</h1>
            </header>
            <div style={{ textAlign: 'center', margin: '20px' }}>
                {/* <input
                    type="text"
                    placeholder="Search doctors by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ fontSize: '20px', padding: '10px', width: '300px', marginRight: '10px' }}
                /> */}
                <SearchableDropdown
                    options={positions}
                    onSelect={handlePositionSelect}
                />
            </div>
            <div className="doctor-grid" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {currentDoctors.map(doctor => (
                    <Link to={`/profile/${doctor._id}`} key={doctor._id} className="doctor-link">
                        <div className="doctor-card" style={{ margin: '10px', border: '1px solid #ccc', padding: '20px', width: '300px' }}>
                            <img src={doctor.profileImage} alt={doctor.fullName} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <h3>{doctor.fullName}</h3>
                            <p>{doctor.specialty}</p>
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
