const express = require('express');
const PaymentControl = require("../Controller/product paymentController");

const router = express.Router();

// Endpoint for processing payments
router.post('order/payment', PaymentControl.payMent);
router.get('order/payment/view',PaymentControl.PaymentDetails)

// router.post('/booking/payment/success', PaymentControl.Success)

// router.get('/doctor/:doctorId/bookings', PaymentControl.getDoctorBookings);

module.exports = router;