const express = require('express');
const router = express.Router();
const userController = require('../Controller/signUpController');
// const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


router.post('/create', userController.createUser);
router.get('/view', userController.getAllUsers);
router.get('/view/:id', userController.getUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
