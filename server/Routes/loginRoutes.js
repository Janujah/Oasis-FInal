

const express = require("express");
const router = express.Router();
const LogInControl = require("../Controller/logincontroller");
const checkAuthenticated = require('../utils/loginAuth');

//routes using controller function

router.post("/login", checkAuthenticated, LogInControl.loginUser);


module.exports = router;