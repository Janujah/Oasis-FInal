


const express = require('express');
const router = express.Router();
const userController = require('../Controller/DoctorController');
const upload = require('../utils/multer');

router.post('/create', userController.createUser);
router.put('/update/:id', userController.updateUser);
router.get('/view', userController.getAllUsers);
router.get('/view/:id', userController.getUser);
router.delete('/delete/:id', userController.deleteUser);
router.patch('/verify/:id', userController.patchUsers);

module.exports = router;
