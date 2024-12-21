// routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const appointmentController = require('../Controller/ApponitmentControllor');

// POST request to create a new appointment
router.post('/', appointmentController.createAppointment);

module.exports = router;
