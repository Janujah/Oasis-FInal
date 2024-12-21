const express = require('express');
const router = express.Router();
const countController = require('../Controller/countcontrollor');

router.get('/users', countController.userCount);
router.get('/doctors', countController.doctorCount);
router.get('/technicians', countController.technicianCount);
router.get('/consumers', countController.consumerCount);
router.get('/order', countController.orderCount);
router.get('/payments', countController.paymentCount);

module.exports = router;
