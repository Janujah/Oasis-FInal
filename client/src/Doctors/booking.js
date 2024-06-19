// // import React, { useState, useEffect } from 'react';
// // import { loadStripe } from '@stripe/stripe-js';
// // import StripeCheckout from 'react-stripe-checkout';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import {jwtDecode} from 'jwt-decode';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const stripePromise = loadStripe('pk_test_51PGywdBwqNocB2yIgRUhTOxCLUXifycb47usxmBwsizanJt9hIuwOLGasezA5xeXFukFgxT4UPmcqTRPl8ekCh3M00GL7hsLNh');

// // function BookingForm() {
// //     const location = useLocation();
// //     const navigate = useNavigate();
// //     const { doctorName, availability, doctorId } = location.state || {};

// //     const [formData, setFormData] = useState({
// //         doctorName: doctorName || '',
// //         preferredDate: availability ? availability.day : '',
// //         preferredTime: availability ? availability.time : '',
// //         fullName: '',
// //         dob: '',
// //         gender: '',
// //         email: '',
// //         phone: '',
// //         consultationReason: '',
// //         preferredLanguage: '',
// //         visitedBefore: '',
// //         consent: false,
// //         doctorId: doctorId || ''
// //     });

// //     const [errors, setErrors] = useState({});
// //     const [booking, setBooking] = useState({
// //         name: "Booking for Doctor consultation",
// //         price: 1500
// //     });
// //     const [paymentProcessed, setPaymentProcessed] = useState(false);

// //     useEffect(() => {
// //         // Assuming the JWT token is stored in localStorage
// //         const token = localStorage.getItem('auth-token');
// //         if (token) {
// //             const decodedToken = jwtDecode(token);
// //             if (decodedToken) {
// //                 setFormData(prev => ({
// //                     ...prev,
// //                     fullName: decodedToken.userName || '',
// //                     email: decodedToken.email || ''
// //                 }));
// //             }
// //         }
// //     }, []);

// //     const handleChange = (e) => {
// //         const { name, value, type, checked } = e.target;
// //         setFormData(prev => ({
// //             ...prev,
// //             [name]: type === 'checkbox' ? checked : value
// //         }));
// //     };

// //     const validateForm = () => {
// //         let newErrors = {};
// //         let isValid = true;

// //         if (!formData.fullName.trim()) {
// //             isValid = false;
// //             newErrors.fullName = 'Full name is required.';
// //         }
// //         if (!formData.dob) {
// //             isValid = false;
// //             newErrors.dob = 'Date of birth is required.';
// //         }
// //         if (!formData.gender) {
// //             isValid = false;
// //             newErrors.gender = 'Gender is required.';
// //         }
// //         if (!formData.email) {
// //             isValid = false;
// //             newErrors.email = 'Email address is required.';
// //         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// //             isValid = false;
// //             newErrors.email = 'Email address is invalid.';
// //         }
// //         if (!formData.phone) {
// //             isValid = false;
// //             newErrors.phone = 'Phone number is required.';
// //         } else if (!/^\d{10}$/.test(formData.phone)) {
// //             isValid = false;
// //             newErrors.phone = 'Phone number must be 10 digits.';
// //         }
// //         if (!formData.consultationReason.trim()) {
// //             isValid = false;
// //             newErrors.consultationReason = 'Reason for consultation is required.';
// //         }
// //         if (!formData.preferredDate) {
// //             isValid = false;
// //             newErrors.preferredDate = 'Preferred date of consultation is required.';
// //         }
// //         if (!formData.preferredTime) {
// //             isValid = false;
// //             newErrors.preferredTime = 'Preferred time slot is required.';
// //         }
// //         if (!formData.preferredLanguage) {
// //             isValid = false;
// //             newErrors.preferredLanguage = 'Preferred language is required.';
// //         }
// //         if (!formData.visitedBefore) {
// //             isValid = false;
// //             newErrors.visitedBefore = 'Please indicate if you have visited us before.';
// //         }
// //         if (!formData.consent) {
// //             isValid = false;
// //             newErrors.consent = 'You must give your consent to proceed.';
// //         }

// //         setErrors(newErrors);
// //         return isValid;
// //     };

// //     const handleFormSubmit = async (e) => {
// //         e.preventDefault();

// //         if (!validateForm()) {
// //             toast.error('Please fill out all required fields before proceeding.', { position: 'bottom-right' });
// //             return;
// //         }

// //         try {
// //             const response = await fetch('https://oasis-final-directory.onrender.com/consult/create', {
// //                 method: 'POST',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify(formData)
// //             });

// //             if (response.ok) {
// //                 toast.success('Form submitted successfully! Please proceed with the payment.', { position: 'bottom-right' });
// //                 setPaymentProcessed(true);
// //             } else {
// //                 throw new Error('Form submission failed');
// //             }
// //         } catch (error) {
// //             toast.error('Form submission failed. Please try again.', { position: 'bottom-right' });
// //             console.log(error);
// //         }
// //     };

// //     const handleToken = async (token) => {
// //         try {
// //             const response = await fetch('https://oasis-final-directory.onrender.com/booking/payment', {
// //                 method: 'POST',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify({ token, booking: formData })
// //             });

// //             if (response.ok) {
// //                 const data = await response.json();
// //                 toast.success('Payment Successful!', { position: 'bottom-right' });

// //                 // After successful payment, add the booking to the doctor's dashboard
// //                 const addToDashboardResponse = await fetch('https://oasis-final-directory.onrender.com/booking/payment/success', {
// //                     method: 'POST',
// //                     headers: { 'Content-Type': 'application/json' },
// //                     body: JSON.stringify({ bookingId: data.bookingId, doctorId: data.doctorId })
// //                 });

// //                 if (addToDashboardResponse.ok) {
// //                     toast.success('Booking added to doctor\'s dashboard!', { position: 'bottom-right' });
// //                     navigate('/');
// //                 } else {
// //                     throw new Error('Failed to add booking to doctor\'s dashboard');
// //                 }
// //             } else {
// //                 throw new Error('Payment failed');
// //             }
// //         } catch (error) {
// //             // toast.error('Payment failed. Please try again.', { position: 'bottom-right' });
// //             console.error(error);
// //         }
// //     };

// //     return (
// //         <div className="container mt-5 mb-5">
            
// //             <ToastContainer />
// //             <h2 className="mb-4">Booking Form</h2>
// //             <form onSubmit={handleFormSubmit}>
// //                 <div className="form-group">
// //                     <label htmlFor="doctorName">Doctor's Name</label>
// //                     <input
// //                         type="text"
// //                         className="form-control"
// //                         id="doctorName"
// //                         name="doctorName"
// //                         value={formData.doctorName}
// //                         onChange={handleChange}
// //                         disabled
// //                     />
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="preferredDate">Preferred Date</label>
// //                     <input
// //                         type="date"
// //                         className="form-control"
// //                         id="preferredDate"
// //                         name="preferredDate"
// //                         value={formData.preferredDate}
// //                         onChange={handleChange}
// //                     />
// //                     {errors.preferredDate && <small className="text-danger">{errors.preferredDate}</small>}
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="preferredTime">Preferred Time</label>
// //                     <input
// //                         type="time"
// //                         className="form-control"
// //                         id="preferredTime"
// //                         name="preferredTime"
// //                         value={formData.preferredTime}
// //                         onChange={handleChange}
// //                         disabled
// //                     />
// //                     {errors.preferredTime && <small className="text-danger">{errors.preferredTime}</small>}
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="fullName">Full Name</label>
// //                     <input
// //                         type="text"
// //                         className="form-control"
// //                         id="fullName"
// //                         name="fullName"
// //                         value={formData.fullName}
// //                         onChange={handleChange}
// //                         disabled
// //                     />
// //                     {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="dob">Date of Birth</label>
// //                     <input
// //                         type="date"
// //                         className="form-control"
// //                         id="dob"
// //                         name="dob"
// //                         value={formData.dob}
// //                         onChange={handleChange}
// //                     />
// //                     {errors.dob && <small className="text-danger">{errors.dob}</small>}
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="gender">Gender</label>
// //                     <select
// //                         className="form-control"
// //                         id="gender"
// //                         name="gender"
// //                         value={formData.gender}
// //                         onChange={handleChange}
// //                     >
// //                         <option value="">Select Gender</option>
// //                         <option value="male">Male</option>
// //                         <option value="female">Female</option>
// //                         <option value="other">Other</option>
// //                     </select>
// //                     {errors.gender && <small className="text-danger">{errors.gender}</small>}
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="email">Email</label>
// //                     <input
// //                         type="email"
// //                         className="form-control"
// //                         id="email"
// //                         name="email"
// //                         value={formData.email}
// //                         onChange={handleChange}
// //                         disabled

// //                     />
// //                     {errors.email && <small className="text-danger">{errors.email}</small>}
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="phone">Phone Number</label>
// //                     <input
// //                         type="text"
// //                         className="form-control"
// //                         id="phone"
// //                         name="phone"
// //                         value={formData.phone}
// //                         onChange={handleChange}
// //                     />
// //                     {errors.phone && <small className="text-danger">{errors.phone}</small>}
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="consultationReason">Reason for Consultation</label>
// //                     <textarea
// //                         className="form-control"
// //                         id="consultationReason"
// //                         name="consultationReason"
// //                         value={formData.consultationReason}
// //                         onChange={handleChange}
// //                     />
// //                     {errors.consultationReason && <small className="text-danger">{errors.consultationReason}</small>}
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="preferredLanguage">Preferred Language</label>
// //                     <select
// //                         className="form-control"
// //                         id="preferredLanguage"
// //                         name="preferredLanguage"
// //                         value={formData.preferredLanguage}
// //                         onChange={handleChange}
// //                     >
// //                         <option value="">Select Language</option>
// //                         <option value="English">English</option>
// //                         <option value="Spanish">Spanish</option>
// //                         <option value="Other">Other</option>
// //                     </select>
// //                     {errors.preferredLanguage && <small className="text-danger">{errors.preferredLanguage}</small>}
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="visitedBefore">Have you visited us before?</label>
// //                     <select
// //                         className="form-control"
// //                         id="visitedBefore"
// //                         name="visitedBefore"
// //                         value={formData.visitedBefore}
// //                         onChange={handleChange}
// //                     >
// //                         <option value="">Select an option</option>
// //                         <option value="yes">Yes</option>
// //                         <option value="no">No</option>
// //                     </select>
// //                     {errors.visitedBefore && <small className="text-danger">{errors.visitedBefore}</small>}
// //                 </div>
// //                 <div className="form-group form-check">
// //                     <input
// //                         type="checkbox"
// //                         className="form-check-input"
// //                         id="consent"
// //                         name="consent"
// //                         checked={formData.consent}
// //                         onChange={handleChange}
// //                     />
// //                     <label className="form-check-label" htmlFor="consent">I give my consent for data processing.</label>
// //                     {errors.consent && <small className="text-danger">{errors.consent}</small>}
// //                 </div>
// //                 <button type="submit" className="btn btn-primary">Submit</button>
// //             </form>
// //             {paymentProcessed && (
// //                 <StripeCheckout
// //                     stripeKey="pk_test_51PGywdBwqNocB2yIgRUhTOxCLUXifycb47usxmBwsizanJt9hIuwOLGasezA5xeXFukFgxT4UPmcqTRPl8ekCh3M00GL7hsLNh"
// //                     token={handleToken}
// //                     name="Consultation Booking"
// //                     currency='LKR'
// //                     amount={booking.price * 100}
// //                 >
// //                     <button className="btn btn-success mt-4">Confirm Payment</button>
// //                 </StripeCheckout>
// //             )}
// //         </div>
// //     );
// // }

// // export default BookingForm;



// import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import StripeCheckout from 'react-stripe-checkout';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const stripePromise = loadStripe('pk_test_51PGywdBwqNocB2yIgRUhTOxCLUXifycb47usxmBwsizanJt9hIuwOLGasezA5xeXFukFgxT4UPmcqTRPl8ekCh3M00GL7hsLNh');

// function BookingForm() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { doctorName, availability, doctorId } = location.state || {};

//     const [currentPage, setCurrentPage] = useState(1);

//     const [formData, setFormData] = useState({
//         doctorName: doctorName || '',
//         preferredDate: availability ? availability.day : '',
//         preferredTime: availability ? availability.time : '',
//         fullName: '',
//         dob: '',
//         gender: '',
//         email: '',
//         phone: '',
//         consultationReason: '',
//         preferredLanguage: '',
//         visitedBefore: '',
//         consent: false,
//         doctorId: doctorId || ''
//     });

//     const [errors, setErrors] = useState({});
//     const [booking, setBooking] = useState({
//         name: "Booking for Doctor consultation",
//         price: 1500
//     });
//     const [paymentProcessed, setPaymentProcessed] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem('auth-token');
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             if (decodedToken) {
//                 setFormData(prev => ({
//                     ...prev,
//                     fullName: decodedToken.userName || '',
//                     email: decodedToken.email || ''
//                 }));
//             }
//         }
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const validateForm = () => {
//         let newErrors = {};
//         let isValid = true;

//         if (!formData.fullName.trim()) {
//             isValid = false;
//             newErrors.fullName = 'Full name is required.';
//         }
//         if (!formData.dob) {
//             isValid = false;
//             newErrors.dob = 'Date of birth is required.';
//         }
//         if (!formData.gender) {
//             isValid = false;
//             newErrors.gender = 'Gender is required.';
//         }
//         if (!formData.email) {
//             isValid = false;
//             newErrors.email = 'Email address is required.';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             isValid = false;
//             newErrors.email = 'Email address is invalid.';
//         }
//         if (!formData.phone) {
//             isValid = false;
//             newErrors.phone = 'Phone number is required.';
//         } else if (!/^\d{10}$/.test(formData.phone)) {
//             isValid = false;
//             newErrors.phone = 'Phone number must be 10 digits.';
//         }
//         if (!formData.consultationReason.trim()) {
//             isValid = false;
//             newErrors.consultationReason = 'Reason for consultation is required.';
//         }
//         if (!formData.preferredDate) {
//             isValid = false;
//             newErrors.preferredDate = 'Preferred date of consultation is required.';
//         }
//         if (!formData.preferredTime) {
//             isValid = false;
//             newErrors.preferredTime = 'Preferred time slot is required.';
//         }
//         if (!formData.preferredLanguage) {
//             isValid = false;
//             newErrors.preferredLanguage = 'Preferred language is required.';
//         }
//         if (!formData.visitedBefore) {
//             isValid = false;
//             newErrors.visitedBefore = 'Please indicate if you have visited us before.';
//         }
//         if (!formData.consent) {
//             isValid = false;
//             newErrors.consent = 'You must give your consent to proceed.';
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             toast.error('Please fill out all required fields before proceeding.', { position: 'bottom-right' });
//             return;
//         }

//         try {
//             const response = await fetch('https://oasis-final-directory.onrender.com/consult/create', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             });

//             if (response.ok) {
//                 toast.success('Form submitted successfully! Please proceed with the payment.', { position: 'bottom-right' });
//                 setPaymentProcessed(true);
//             } else {
//                 throw new Error('Form submission failed');
//             }
//         } catch (error) {
//             toast.error('Form submission failed. Please try again.', { position: 'bottom-right' });
//             console.log(error);
//         }
//     };

//     const handleToken = async (token) => {
//         try {
//             const response = await fetch('https://oasis-final-directory.onrender.com/booking/payment', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ token, booking: formData })
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 toast.success('Payment Successful!', { position: 'bottom-right' });

//                 const addToDashboardResponse = await fetch('https://oasis-final-directory.onrender.com/booking/payment/success', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ bookingId: data.bookingId, doctorId: data.doctorId })
//                 });

//                 if (addToDashboardResponse.ok) {
//                     toast.success('Booking added to doctor\'s dashboard!', { position: 'bottom-right' });
//                     navigate('/');
//                 } else {
//                     throw new Error('Failed to add booking to doctor\'s dashboard');
//                 }
//             } else {
//                 throw new Error('Payment failed');
//             }
//         } catch (error) {
//             toast.error('Payment failed. Please try again.', { position: 'bottom-right' });
//             console.error(error);
//         }
//     };

//     const renderFormPart = () => {
//         switch (currentPage) {
//             case 1:
//                 return (
//                     <div >
//                         <div className="form-group">
//                             <label htmlFor="doctorName">Doctor's Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="doctorName"
//                                 name="doctorName"
//                                 value={formData.doctorName}
//                                 onChange={handleChange}
//                                 disabled
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="preferredDate">Preferred Date</label>
//                             <input
//                                 type="date"
//                                 className="form-control"
//                                 id="preferredDate"
//                                 name="preferredDate"
//                                 value={formData.preferredDate}
//                                 onChange={handleChange}
//                             />
//                             {errors.preferredDate && <small className="text-danger">{errors.preferredDate}</small>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="preferredTime">Preferred Time</label>
//                             <input
//                                 type="time"
//                                 className="form-control"
//                                 id="preferredTime"
//                                 name="preferredTime"
//                                 value={formData.preferredTime}
//                                 onChange={handleChange}
//                                 disabled
//                             />
//                             {errors.preferredTime && <small className="text-danger">{errors.preferredTime}</small>}
//                         </div>
//                     </div>
//                 );
//             case 2:
//                 return (
//                     <>
//                         <div className="form-group">
//                             <label htmlFor="fullName">Full Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="fullName"
//                                 name="fullName"
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                                 disabled
//                             />
//                             {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="dob">Date of Birth</label>
//                             <input
//                                 type="date"
//                                 className="form-control"
//                                 id="dob"
//                                 name="dob"
//                                 value={formData.dob}
//                                 onChange={handleChange}
//                             />
//                             {errors.dob && <small className="text-danger">{errors.dob}</small>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="gender">Gender</label>
//                             <select
//                                 className="form-control"
//                                 id="gender"
//                                 name="gender"
//                                 value={formData.gender}
//                                 onChange={handleChange}
//                             >
//                                 <option value="">Select Gender</option>
//                                 <option value="male">Male</option>
//                                 <option value="female">Female</option>
//                                 <option value="other">Other</option>
//                             </select>
//                             {errors.gender && <small className="text-danger">{errors.gender}</small>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="email">Email</label>
//                             <input
//                                 type="email"
//                                 className="form-control"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 disabled
//                             />
//                             {errors.email && <small className="text-danger">{errors.email}</small>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="phone">Phone Number</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="phone"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                             />
//                             {errors.phone && <small className="text-danger">{errors.phone}</small>}
//                         </div>
//                     </>
//                 );
//             case 3:
//                 return (
//                     <>
//                         <div className="form-group">
//                             <label htmlFor="consultationReason">Reason for Consultation</label>
//                             <textarea
//                                 className="form-control"
//                                 id="consultationReason"
//                                 name="consultationReason"
//                                 value={formData.consultationReason}
//                                 onChange={handleChange}
//                             />
//                             {errors.consultationReason && <small className="text-danger">{errors.consultationReason}</small>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="preferredLanguage">Preferred Language</label>
//                             <select
//                                 className="form-control"
//                                 id="preferredLanguage"
//                                 name="preferredLanguage"
//                                 value={formData.preferredLanguage}
//                                 onChange={handleChange}
//                             >
//                                 <option value="">Select Language</option>
//                                 <option value="English">English</option>
//                                 <option value="Spanish">Spanish</option>
//                                 <option value="Other">Other</option>
//                             </select>
//                             {errors.preferredLanguage && <small className="text-danger">{errors.preferredLanguage}</small>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="visitedBefore">Have you visited us before?</label>
//                             <select
//                                 className="form-control"
//                                 id="visitedBefore"
//                                 name="visitedBefore"
//                                 value={formData.visitedBefore}
//                                 onChange={handleChange}
//                             >
//                                 <option value="">Select an option</option>
//                                 <option value="yes">Yes</option>
//                                 <option value="no">No</option>
//                             </select>
//                             {errors.visitedBefore && <small className="text-danger">{errors.visitedBefore}</small>}
//                         </div>
//                         <div className="form-group form-check">
//                             <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id="consent"
//                                 name="consent"
//                                 checked={formData.consent}
//                                 onChange={handleChange}
//                             />
//                             <label className="form-check-label" htmlFor="consent">I give my consent for data processing.</label>
//                             {errors.consent && <small className="text-danger">{errors.consent}</small>}
//                         </div>
//                     </>
//                 );
//             default:
//                 return null;
//         }
//     };

//     const handleNext = () => {
//         if (currentPage < 3) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevious = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <div className='container1'>
//         <div className="container mt-5 mb-5">
//             <ToastContainer />
//             <h2 className="mb-4" style={{textAlign:'center', fontSize:'45px'}}><b>Booking Form</b></h2>
//             <form onSubmit={handleFormSubmit} >
//                 {renderFormPart()}
//                 <div className="d-flex justify-content-between mt-4">
//                     {currentPage > 1 && <button type="button" className="btn btn-secondary" onClick={handlePrevious}>Previous</button>}
//                     {currentPage < 3 ? (
//                         <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
//                     ) : (
//                         <button type="submit" className="btn btn-primary">Submit</button>
//                     )}
//                 </div>
//             </form>
//             {paymentProcessed && (
//                 <StripeCheckout
//                     stripeKey="pk_test_51PGywdBwqNocB2yIgRUhTOxCLUXifycb47usxmBwsizanJt9hIuwOLGasezA5xeXFukFgxT4UPmcqTRPl8ekCh3M00GL7hsLNh"
//                     token={handleToken}
//                     name="Consultation Booking"
//                     currency='LKR'
//                     amount={booking.price * 100}
//                 >
//                     <button className="btn btn-success mt-4">Confirm Payment</button>
//                 </StripeCheckout>
//             )}
//         </div>
//         </div>
//     );
// }

// export default BookingForm;

// import React, { useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {jwtDecode} from 'jwt-decode';

// function BookingForm({ doctorName, availability, doctorId, onClose }) {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [formData, setFormData] = useState({
//         doctorName: doctorName || '',
//         preferredDate: availability ? availability.day : '',
//         preferredTime: availability ? availability.time : '',
//         fullName: '',
//         dob: '',
//         gender: '',
//         email: '',
//         phone: '',
//         consultationReason: '',
//         preferredLanguage: '',
//         visitedBefore: '',
//         consent: false,
//         doctorId: doctorId || ''
//     });
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         const token = localStorage.getItem('auth-token');
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             if (decodedToken) {
//                 setFormData(prev => ({
//                     ...prev,
//                     fullName: decodedToken.userName || '',
//                     email: decodedToken.email || ''
//                 }));
//             }
//         }
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const validatePage1 = () => {
//         let newErrors = {};
//         let isValid = true;

//         if (!formData.fullName.trim()) {
//             isValid = false;
//             newErrors.fullName = 'Full name is required.';
//         }
//         if (!formData.dob) {
//             isValid = false;
//             newErrors.dob = 'Date of birth is required.';
//         }
//         if (!formData.gender) {
//             isValid = false;
//             newErrors.gender = 'Gender is required.';
//         }
//         if (!formData.email) {
//             isValid = false;
//             newErrors.email = 'Email address is required.';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             isValid = false;
//             newErrors.email = 'Email address is invalid.';
//         }
//         if (!formData.phone) {
//             isValid = false;
//             newErrors.phone = 'Phone number is required.';
//         } else if (!/^\d{10}$/.test(formData.phone)) {
//             isValid = false;
//             newErrors.phone = 'Phone number must be 10 digits.';
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const validatePage2 = () => {
//         let newErrors = {};
//         let isValid = true;

//         if (!formData.consultationReason.trim()) {
//             isValid = false;
//             newErrors.consultationReason = 'Reason for consultation is required.';
//         }
//         if (!formData.preferredDate) {
//             isValid = false;
//             newErrors.preferredDate = 'Preferred date of consultation is required.';
//         }
//         if (!formData.preferredTime) {
//             isValid = false;
//             newErrors.preferredTime = 'Preferred time slot is required.';
//         }
//         if (!formData.preferredLanguage) {
//             isValid = false;
//             newErrors.preferredLanguage = 'Preferred language is required.';
//         }
//         if (!formData.visitedBefore) {
//             isValid = false;
//             newErrors.visitedBefore = 'Please indicate if you have visited us before.';
//         }
//         if (!formData.consent) {
//             isValid = false;
//             newErrors.consent = 'You must give your consent to proceed.';
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleNext = () => {
//         if (currentPage === 1 && validatePage1()) {
//             setCurrentPage(2);
//         }
//     };

//     const handlePrevious = () => {
//         if (currentPage === 2) {
//             setCurrentPage(1);
//         }
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         if (currentPage === 2 && validatePage2()) {
//             try {
//                 const bookingDetails = { ...formData, preferredDate: availability.day, preferredTime: availability.time };
//                 const response = await fetch('https://oasis-final-directory.onrender.com/appointments/book', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(bookingDetails),
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     toast.success("Appointment booked successfully!", { position: "bottom-right" });
//                     onClose();  // Close the modal after successful booking
//                 } else {
//                     throw new Error('Failed to book appointment');
//                 }
//             } catch (error) {
//                 console.error('Error booking appointment:', error);
//                 toast.error("Failed to book appointment", { position: "bottom-right" });
//             }
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleFormSubmit}>
//                 <h2>Book an Appointment with {doctorName}</h2>
//                 {currentPage === 1 && (
//                     <>
//                         <div>
//                             <label>Doctor Name</label>
//                             <input
//                                 type="text"
//                                 name="doctorName"
//                                 value={formData.doctorName}
//                                 readOnly
//                             />
//                         </div>
//                         <div>
//                             <label>Full Name</label>
//                             <input
//                                 type="text"
//                                 name="fullName"
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                             />
//                             {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
//                         </div>
//                         <div>
//                             <label>Date of Birth</label>
//                             <input
//                                 type="date"
//                                 name="dob"
//                                 value={formData.dob}
//                                 onChange={handleChange}
//                             />
//                             {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}
//                         </div>
//                         <div>
//                             <label>Gender</label>
//                             <select name="gender" value={formData.gender} onChange={handleChange}>
//                                 <option value="">Select...</option>
//                                 <option value="Male">Male</option>
//                                 <option value="Female">Female</option>
//                                 <option value="Other">Other</option>
//                             </select>
//                             {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
//                         </div>
//                         <div>
//                             <label>Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                             {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
//                         </div>
//                         <div>
//                             <label>Phone</label>
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                             />
//                             {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
//                         </div>
//                     </>
//                 )}
//                 {currentPage === 2 && (
//                     <>
//                         <div>
//                             <label>Reason for Consultation</label>
//                             <textarea
//                                 name="consultationReason"
//                                 value={formData.consultationReason}
//                                 onChange={handleChange}
//                             />
//                             {errors.consultationReason && <p style={{ color: 'red' }}>{errors.consultationReason}</p>}
//                         </div>
//                         <div>
//                             <label>Preferred Date</label>
//                             <input
//                                 type="text"
//                                 name="preferredDate"
//                                 value={formData.preferredDate}
//                                 readOnly
//                             />
//                         </div>
//                         <div>
//                             <label>Preferred Time</label>
//                             <input
//                                 type="text"
//                                 name="preferredTime"
//                                 value={formData.preferredTime}
//                                 readOnly
//                             />
//                         </div>
//                         <div>
//                             <label>Preferred Language</label>
//                             <input
//                                 type="text"
//                                 name="preferredLanguage"
//                                 value={formData.preferredLanguage}
//                                 onChange={handleChange}
//                             />
//                             {errors.preferredLanguage && <p style={{ color: 'red' }}>{errors.preferredLanguage}</p>}
//                         </div>
//                         <div>
//                             <label>Have you visited us before?</label>
//                             <select name="visitedBefore" value={formData.visitedBefore} onChange={handleChange}>
//                                 <option value="">Select...</option>
//                                 <option value="Yes">Yes</option>
//                                 <option value="No">No</option>
//                             </select>
//                             {errors.visitedBefore && <p style={{ color: 'red' }}>{errors.visitedBefore}</p>}
//                         </div>
//                         <div>
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     name="consent"
//                                     checked={formData.consent}
//                                     onChange={handleChange}
//                                 />
//                                 I consent to my data being used for this appointment.
//                             </label>
//                             {errors.consent && <p style={{ color: 'red' }}>{errors.consent}</p>}
//                         </div>
//                     </>
//                 )}
//                 <div>
//                     {currentPage > 1 && (
//                         <button type="button" onClick={handlePrevious}>
//                             Previous
//                         </button>
//                     )}
//                     {currentPage < 2 && (
//                         <button type="button" onClick={handleNext}>
//                             Next
//                         </button>
//                     )}
//                     {currentPage === 2 && (
//                         <button type="submit">
//                             Submit
//                         </button>
//                     )}
//                     <button type="button" onClick={onClose}>Cancel</button>
//                 </div>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// }

// export default BookingForm;



import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from 'jwt-decode';

function BookingForm({ doctorName, availability, doctorId, onClose }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        doctorName: doctorName || '',
        preferredDate: availability ? availability.day : '',
        preferredTime: availability ? availability.time : '',
        fullName: '',
        dob: '',
        gender: '',
        email: '',
        phone: '',
        consultationReason: '',
        preferredLanguage: '',
        visitedBefore: '',
        consent: false,
        doctorId: doctorId || ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken) {
                setFormData(prev => ({
                    ...prev,
                    fullName: decodedToken.userName || '',
                    email: decodedToken.email || ''
                }));
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validatePage1 = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.fullName.trim()) {
            isValid = false;
            newErrors.fullName = 'Full name is required.';
        }
        if (!formData.dob) {
            isValid = false;
            newErrors.dob = 'Date of birth is required.';
        }
        if (!formData.gender) {
            isValid = false;
            newErrors.gender = 'Gender is required.';
        }
        if (!formData.email) {
            isValid = false;
            newErrors.email = 'Email address is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isValid = false;
            newErrors.email = 'Email address is invalid.';
        }
        if (!formData.phone) {
            isValid = false;
            newErrors.phone = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            isValid = false;
            newErrors.phone = 'Phone number must be 10 digits.';
        }

        setErrors(newErrors);
        return isValid;
    };

    const validatePage2 = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.consultationReason.trim()) {
            isValid = false;
            newErrors.consultationReason = 'Reason for consultation is required.';
        }
        if (!formData.preferredDate) {
            isValid = false;
            newErrors.preferredDate = 'Preferred date of consultation is required.';
        }
        if (!formData.preferredTime) {
            isValid = false;
            newErrors.preferredTime = 'Preferred time slot is required.';
        }
        if (!formData.preferredLanguage) {
            isValid = false;
            newErrors.preferredLanguage = 'Preferred language is required.';
        }
        if (!formData.visitedBefore) {
            isValid = false;
            newErrors.visitedBefore = 'Please indicate if you have visited us before.';
        }
        if (!formData.consent) {
            isValid = false;
            newErrors.consent = 'You must give your consent to proceed.';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (currentPage === 1 && validatePage1()) {
            setCurrentPage(2);
        }
    };

    const handlePrevious = () => {
        if (currentPage === 2) {
            setCurrentPage(1);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (currentPage === 2 && validatePage2()) {
            try {
                const response = await fetch('https://your-backend-url/appointments/book', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    toast.success("Appointment booked successfully!", { position: "bottom-right" });
                    onClose();  // Close the modal after successful booking
                } else {
                    throw new Error('Failed to book appointment');
                }
            } catch (error) {
                console.error('Error booking appointment:', error);
                toast.error("Failed to book appointment", { position: "bottom-right" });
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <h2>Book an Appointment with {doctorName}</h2>
                {currentPage === 1 && (
                    <>
                        <div>
                            <label>Doctor Name</label>
                            <input
                                type="text"
                                name="doctorName"
                                value={formData.doctorName}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
                        </div>
                        <div>
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                            {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}
                        </div>
                        <div>
                            <label>Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                        </div>
                        <div>
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
                        </div>
                    </>
                )}
                {currentPage === 2 && (
                    <>
                        <div>
                            <label>Reason for Consultation</label>
                            <textarea
                                name="consultationReason"
                                value={formData.consultationReason}
                                onChange={handleChange}
                            />
                            {errors.consultationReason && <p style={{ color: 'red' }}>{errors.consultationReason}</p>}
                        </div>
                        <div>
                            <label>Preferred Date</label>
                            <input
                                type="date"
                                name="preferredDate"
                                value={formData.preferredDate}
                                onChange={handleChange}
                            />
                            {errors.preferredDate && <p style={{ color: 'red' }}>{errors.preferredDate}</p>}
                        </div>
                        <div>
                            <label>Preferred Time</label>
                            <input
                                type="text"
                                name="preferredTime"
                                value={formData.preferredTime}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Preferred Language</label>
                            <select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange}>
                                <option value="">Select...</option>
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.preferredLanguage && <p style={{ color: 'red' }}>{errors.preferredLanguage}</p>}
                        </div>
                        <div>
                            <label>Have you visited us before?</label>
                            <select name="visitedBefore" value={formData.visitedBefore} onChange={handleChange}>
                                <option value="">Select...</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            {errors.visitedBefore && <p style={{ color: 'red' }}>{errors.visitedBefore}</p>}
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={handleChange}
                                />
                                I consent to my data being used for this appointment.
                            </label>
                            {errors.consent && <p style={{ color: 'red' }}>{errors.consent}</p>}
                        </div>
                    </>
                )}
                <div>
                    {currentPage > 1 && (
                        <button type="button" onClick={handlePrevious}>
                            Previous
                        </button>
                    )}
                    {currentPage < 2 && (
                        <button type="button" onClick={handleNext}>
                            Next
                        </button>
                    )}
                    {currentPage === 2 && (
                        <button type="submit">
                            Submit
                        </button>
                    )}
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default BookingForm;
