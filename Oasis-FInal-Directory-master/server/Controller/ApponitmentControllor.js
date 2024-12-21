// controllers/appointmentController.js

const Appointment = require('../Models/Appointmentmodel');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { start, end, title } = req.body;
    const appointment = new Appointment({ start, end, title });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};
