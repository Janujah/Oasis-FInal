

// const express = require("express");
// const router = express.Router();
// const LogInControl = require("../Controller/logincontroller");

// //routes using controller function

// router.post("/login", LogInControl.loginUser);


// module.exports = router;




const express = require("express");
const router = express.Router();
const LogInControl = require("../Controller/logincontroller");


router.post("/login", LogInControl.loginUser);


module.exports = router;