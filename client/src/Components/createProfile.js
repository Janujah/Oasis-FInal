import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid'; // Import UUID to generate unique file names

function ProfilePage({ setUserName }) {
    const [formData, setFormData] = useState({
        fullName: '',
        position: '',
        email: '',
        bio: '',
        registeredId: '',
        workingHospitals: '',
        age: '',
        contactNo: '',
        availability: [{ day: '', time: '' }],
    });
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.position) newErrors.position = 'Your position is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.registeredId) newErrors.registeredId = 'Registered ID is required';
        if (!formData.workingHospitals) newErrors.workingHospitals = 'Working hospitals are required';
        if (!formData.age) newErrors.age = 'Age is required';
        if (!formData.contactNo || formData.contactNo.length !== 10) newErrors.contactNo = 'Valid 10-digit phone number required';
        formData.availability.forEach((slot, index) => {
            if (!slot.day) newErrors[`day${index}`] = 'Day is required';
            if (!slot.time) newErrors[`time${index}`] = 'Time is required';
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvailabilityChange = (index, field, value) => {
        const newAvailability = formData.availability.map((slot, idx) =>
            index === idx ? { ...slot, [field]: value } : slot
        );
        setFormData(prev => ({ ...prev, availability: newAvailability }));
    };

    const handleAddAvailability = () => {
        setFormData(prev => ({
            ...prev, availability: [...prev.availability, { day: '', time: '' }]
        }));
    };

    const handleRemoveAvailability = (index) => {
        setFormData(prev => ({
            ...prev, availability: prev.availability.filter((_, idx) => idx !== index)
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) setProfileImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const data = new FormData();
        data.append('profileImage', profileImage);
        data.append('fullName', formData.fullName);
        data.append('position', formData.position);
        data.append('email', formData.email);
        data.append('bio', formData.bio);
        data.append('registeredId', formData.registeredId);
        data.append('workingHospitals', formData.workingHospitals);
        data.append('age', formData.age);
        data.append('contactNo', formData.contactNo);
        data.append('availability', JSON.stringify(formData.availability));

        try {
            const response = await fetch('http://oasis-final-directory.onrender.com/Doctors/create', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                toast.success("Profile saved successfully", { position: "bottom-right" });
                navigate('/Doctors');
            } else {
                throw new Error('Failed to save profile');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Failed to save profile", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    const renderFormInput = (key, label) => (
        <div key={key}>
            <label htmlFor={key}>{label}:</label>
            <input
                id={key}
                name={key}
                type={key === 'age' || key === 'contactNo' ? 'number' : 'text'}
                value={formData[key]}
                onChange={handleChange}
                style={{ padding: "8px", margin: "5px 0" }}
            />
            {errors[key] && <div style={{ color: "red" }}>{errors[key]}</div>}
        </div>
    );

    return (
        <div style={{ background: 'linear-gradient(to bottom, #FFFCFC, #AB9551)' }} className='container11'>
            <div className="profile-container" style={{ padding: "60px", width: '800px' }}>
                <h1 style={{ textAlign: "center" }}>Your Profile</h1>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "500px", margin: "auto" }} encType="multipart/form-data">
                    <label htmlFor="profileImage">Profile Picture:</label>
                    <input
                        id="profileImage"
                        name="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ margin: "5px 0" }}
                    />
                    {profileImage && <img src={URL.createObjectURL(profileImage)} alt="Profile" style={{ width: "200px", height: "200px", marginBottom: "10px" }} />}
                    {Object.keys(formData).filter(key => key !== 'availability').map(key => (
                        renderFormInput(key, key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim())
                    ))}
                    {formData.availability.map((slot, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <input
                                type="text"
                                placeholder="Day"
                                value={slot.day}
                                onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
                                style={{ marginRight: '5px' }}
                            />
                            <input
                                type="time"
                                placeholder="Time"
                                value={slot.time}
                                onChange={(e) => handleAvailabilityChange(index, 'time', e.target.value)}
                                style={{ marginRight: '5px' }}
                            />
                            <button type="button" onClick={() => handleRemoveAvailability(index)} style={{ color: 'red' }}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddAvailability} style={{ margin: '10px 0', padding: '5px' }}>Add Availability</button>
                    <button type="submit" style={{ padding: "10px", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }} disabled={loading}>
                        {loading ? 'Saving...' : 'Save Profile'}
                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}

export default ProfilePage;
