// const jwt = require('jsonwebtoken');

// const checkAuthenticated = (req, res, next) => {
//     const token = req.cookies.token;
    
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 return next(); // Proceed if token is invalid
//             }
//             // Redirect based on role
//             const userRole = decoded.Role;
//             switch (userRole) {
//                 case 'Doctor':
//                     return res.redirect('/Doctors');
//                 case 'Ortho_technician':
//                     return res.redirect('/Technicians');
//                 case 'consumers':
//                     return res.redirect('/');
//                 case 'Admin':
//                     return res.redirect('/Admin/users');
//                 default:
//                     return next(); // Proceed if role is unknown
//             }
//         });
//     } else {
//         next(); // Proceed if no token
//     }
// };

// module.exports = checkAuthenticated;
