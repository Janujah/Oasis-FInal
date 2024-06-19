const express = require('express');
const router = express.Router();
const bookingController = require('../Controller/consultController');

router.post('/create', bookingController.createBooking);
router.get('/view', bookingController.getAllBookings);
router.get('/view/:id', bookingController.getBooking);
router.put('/update/:id', bookingController.updateBooking);
router.patch('/bookings/:id/user-complete', bookingController.markUserComplete);
router.patch('/bookings/:id/doc-complete', bookingController.markDocComplete);
router.delete('/delete/:id', bookingController.deleteBooking);

module.exports = router;
