// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ProfileDetailsPage() {
//     const { id } = useParams();
//     const [doctor, setDoctor] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch(`https://oasis-final-directory.onrender.com/Doctors/view/${id}`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setDoctor(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching doctor details:', error);
//                 toast.error("Failed to load doctor details", { position: "bottom-right" });
//                 setLoading(false);
//             });
//     }, [id]);

//     const handleBookAppointment = (availability) => {
//         navigate(`/booking/${doctor._id}`, { state: { availability, doctorName: doctor.fullName } });
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!doctor) {
//         return <div>Doctor not found</div>;
//     }

//     return (
//         <div style={{ background: 'linear-gradient(to bottom, #FFFCFC, #AB9551)', padding: '60px' }} className='container11'>
//             <div className="profile-container" style={{ width: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
//                 <h1 style={{ textAlign: "center", marginBottom: '20px' }}>{doctor.fullName}</h1>
//                 <img src={doctor.profileImage} alt={doctor.fullName} style={{ display: 'block', margin: '0 auto 20px', width: '200px', height: '200px', borderRadius: '50%' }} />
//                 <p><strong>Position:</strong> {doctor.position}</p>
//                 <p><strong>Email:</strong> {doctor.email}</p>
//                 <p><strong>Bio:</strong> {doctor.bio}</p>
//                 <p><strong>Registered ID:</strong> {doctor.registeredId}</p>
//                 <p><strong>Working Hospitals:</strong> {doctor.workingHospitals}</p>
//                 <p><strong>Age:</strong> {doctor.age}</p>
//                 <p><strong>Contact No:</strong> {doctor.contactNo}</p>
//                 <h3>Availability:</h3>
//                 {doctor.availability && doctor.availability.length > 0 ? (
//                     <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//                         <thead>
//                             <tr>
//                                 <th style={{ border: '1px solid #ddd', padding: '8px' }}>Day</th>
//                                 <th style={{ border: '1px solid #ddd', padding: '8px' }}>Time</th>
//                                 <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {doctor.availability.map((slot, index) => (
//                                 <tr key={index}>
//                                     <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{slot.day}</td>
//                                     <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{slot.time}</td>
//                                     <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
//                                         <button onClick={() => handleBookAppointment(slot)} style={{ padding: '5px 10px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Book Appointment</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>No availability information provided.</p>
//                 )}
//                 <ToastContainer />
//             </div>
//         </div>
//     );
// }

// export default ProfileDetailsPage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingForm from '../Doctors/booking';

function ProfileDetailsPage() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAvailability, setSelectedAvailability] = useState(null);

    useEffect(() => {
        fetch(`https://oasis-final-directory.onrender.com/Doctors/view/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDoctor(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching doctor details:', error);
                toast.error("Failed to load doctor details", { position: "bottom-right" });
                setLoading(false);
            });
    }, [id]);

    const handleBookAppointment = (availability) => {
        setSelectedAvailability(availability);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedAvailability(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!doctor) {
        return <div>Doctor not found</div>;
    }

    return (
        <div style={{ background: 'linear-gradient(to bottom, #FFFCFC, #AB9551)', padding: '60px' }} className='container11'>
            <div className="profile-container" style={{ width: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <h1 style={{ textAlign: "center", marginBottom: '20px' }}>{doctor.fullName}</h1>
                <img src={doctor.profileImage} alt={doctor.fullName} style={{ display: 'block', margin: '0 auto 20px', width: '200px', height: '200px', borderRadius: '50%' }} />
                <p><strong>Position:</strong> {doctor.position}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Bio:</strong> {doctor.bio}</p>
                <p><strong>Registered ID:</strong> {doctor.registeredId}</p>
                <p><strong>Working Hospitals:</strong> {doctor.workingHospitals}</p>
                <p><strong>Age:</strong> {doctor.age}</p>
                <p><strong>Contact No:</strong> {doctor.contactNo}</p>
                <h3>Availability:</h3>
                {doctor.availability && doctor.availability.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Day</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Time</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctor.availability.map((slot, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{slot.day}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{slot.time}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                        <button onClick={() => handleBookAppointment(slot)} style={{ padding: '5px 10px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Book Appointment</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No availability information provided.</p>
                )}
                <ToastContainer />
            </div>

            {modalIsOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '8px',
                        width: '500px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        position: 'relative'
                    }}>
                        <button onClick={closeModal} style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}>×</button>
                        <BookingForm 
                            doctorName={doctor.fullName} 
                            availability={selectedAvailability} 
                            doctorId={doctor._id} 
                            onClose={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDetailsPage;
