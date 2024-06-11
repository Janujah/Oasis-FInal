// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({ message: 'Access Denied. No token provided.' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Invalid Token' });
//         }
//         req.user = decoded;
//         next();
//     });
// };

// module.exports = authenticateToken;
