// routes/doctors.js or your appropriate route file
const express = require('express');
const router = express.Router();
const sendEmail = require('../Controller/emailController'); // Adjust the path as needed

router.post('/payment-success', async (req, res) => {
    const { email, zoomLink, fullName, position, contactNo, availability } = req.body;

    const emailSubject = 'Your Appointment Details';
    const emailText = `
        Hi ${fullName},

        Your appointment has been successfully scheduled.

        Position: ${position}
        Contact Number: ${contactNo}

        Availability:

        Zoom Link: ${zoomLink}

        Best regards,
        Your Company
    `;

    try {
        await sendEmail(email, emailSubject, emailText);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error });
    }
});

module.exports = router;
