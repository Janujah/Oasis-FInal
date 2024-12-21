const express = require('express');
const router = express.Router();
const stripeController = require('../Controller/stripecontroller');

// Route to fetch payment details from Stripe
router.get('/payments', stripeController.getPaymentsFromStripe);

module.exports = router;
