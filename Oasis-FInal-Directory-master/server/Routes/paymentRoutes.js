const express = require('express');
const PaymentControl = require("../Controller/paymentController");

const router = express.Router();

// Endpoint for processing payments
router.post('/payment', PaymentControl.payMent);
router.get("/payment/view",PaymentControl.PaymentDetails)
// router.post('/booking/payment/success', PaymentControl.Success)

// router.get('/doctor/:doctorId/bookings', PaymentControl.getDoctorBookings);

module.exports = router;