// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const UserModel = require("../Models/Signupmodel");

// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: "Email and password must be provided." });
//     }

//     try {
//         const user = await UserModel.findOne({ email: email });

//         if (!user) {
//             console.log("No user found with email:", email);
//             return res.status(404).json({ message: "User not found." });
//         }

//         const isMatch =  bcrypt.compare(password, user.password); // Use await here

//         if (!isMatch) {
//             console.log("Password mismatch for user:", email);
//             return res.status(401).json({ message: "Password is incorrect." });
//         }

//         const token = jwt.sign(
//             { id: user._id, Role: user.Role, email: user.email, userName: user.userName },
//             process.env.JWT, // Corrected the process.env variable
//             { expiresIn: "1d" }
//         );

//         res.cookie("token", token, { httpOnly: true });

//         return res.status(200).json({
//             message: "Success",
//             id: user._id,
//             Role: user.Role,
//             email: user.email,
//             userName: user.userName,
//             token // Send the token in the response
//         });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ message: "Server error while logging in." });
//     }
// };




// const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/Signupmodel");

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password must be provided." });
    }

    try {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            console.log("No user found with email:", email);
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch =  bcrypt.compare(password, user.password); // Use await here

        if (!isMatch) {
            console.log("Password mismatch for user:", email);
            return res.status(401).json({ message: "Password is incorrect." });
        }

        const token = jwt.sign(
            { id: user._id, Role: user.Role, email: user.email, userName: user.userName },
            process.env.JWT, // Corrected the process.env variable
            { expiresIn: "1d" }
        );

        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({
            message: "Success",
            id: user._id,
            Role: user.Role,
            email: user.email,
            userName: user.userName,
            token // Send the token in the response
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error while logging in." });
    }
};