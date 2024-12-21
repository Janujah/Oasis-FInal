// emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., use 'gmail', 'yahoo', 'hotmail', etc.
    auth: {
        user: 'oasisofficial55@gmail.com',
        pass: 'oasisoff55',
    },
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'oasisofficial55@gmail.com',
        to,
        subject,
        text,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};

module.exports = sendEmail;
