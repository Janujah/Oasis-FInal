const express = require('express');
const router = express.Router();
const userController = require('../Controller/TechnicianController');

router.post('/', userController.createUser);
router.get('/view', userController.getAllUsers);
router.get('/view/:email', userController.getUser);
router.put('/update/:email', userController.updateUser);
router.delete('/delete/:email', userController.deleteUser);
router.patch('/verify/:email', userController.updateUser);


module.exports = router;
