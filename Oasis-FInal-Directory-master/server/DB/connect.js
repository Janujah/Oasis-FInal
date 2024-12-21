const Mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const userRoutes = require('../Routes/normaluserRoutes');
const doctorRoutes = require('../Routes/DoctorRoutes');
const SignUpRoutes = require('../Routes/signUpRoutes');
const TechRoutes = require('../Routes/TechnicianRoutes');
const ConsultRoutes = require('../Routes/consultRoutes');
const cookieParser = require("cookie-parser");
const loginRoutes = require('../Routes/loginRoutes');
const paymentRoutes = require('../Routes/paymentRoutes');
const stripeRoutes = require('../Routes/striperoutes');
// const imageRoutes = require('../Routes/uploadimageRouter');
const Email = require('../Routes/emailRoutes')
const appointmentRoutes = require('../Routes/appointment');
const countRoutes = require('../Routes/counroutes');
const productRoutes = require('../Routes/productroutes');
const productOrderRoutes = require('../Routes/productOrderRoutes');
const orderRoutes = require('../Routes/OrderRoutes');
const bodyParser = require('body-parser');
const envurl = process.env.mongodbUrl;
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const cors = require('cors')
const app = express();
const Port = 3002;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/users', userRoutes)
app.use('/Doctors', doctorRoutes)
app.use('/Technicians', TechRoutes)
app.use('/SignUp', SignUpRoutes)
app.use('/consult', ConsultRoutes)
app.use('/user', loginRoutes)
app.use('/booking', paymentRoutes)
app.use('/stripe', stripeRoutes);
// app.use('/Images', imageRoutes);
app.use('/count',countRoutes)
app.use('/Email', Email)
app.use('/appointments', appointmentRoutes);
app.use('/Products',productRoutes)
app.use('/order',orderRoutes)
app.use('/Resource',productOrderRoutes)




app.use(bodyParser.json());
// const { createProxyMiddleware } = require('http-proxy-middleware');


function connectDB() {

    Mongoose.connect(envurl)
        .then(() =>
            console.log("You are connected")
        )
        .catch((err) => {
            console.log("You are not connected", err)
        });


    app.listen(Port, () => {
        console.log(`Server is running on port ${Port}`);
    });
    
}

module.exports = connectDB; 
