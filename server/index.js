const connectDb = require('./DB/connect');
const bodyParser = require('body-parser');
const express = require('express');
// const uploadImage = require("./Controller/uploadimage");
require('dotenv').config()
// const proxy = require('./DB/proxy')
const app = express();
app.use(bodyParser.json());
const cors = require('cors');
// app.use(cors({
//     origin: 'http://localhost:3000'  
// }));

app.use(
    cors({
      origin: ["https://oasis-f-inal-directory-6cg7.vercel.app"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );
app.use(cors());
app.use(express.json());
connectDb();
// proxy();

// let appointments = [];

// app.post('/appointments', (req, res) => {
//   const appointment = req.body;
//   appointments.push(appointment);
//   res.status(201).send(appointment);
// });

// app.get('/appointments', (req, res) => {
//   res.send(appointments);
// });


// app.post("/uploadImage", (req, res) => {
//     uploadImage(req.body.image)
//       .then((url) => res.send(url))
//       .catch((err) => res.status(500).send(err));
//   });
  
//   app.post("/uploadMultipleImages", (req, res) => {
//     uploadImage
//       .uploadMultipleImages(req.body.images)
//       .then((urls) => res.send(urls))
//       .catch((err) => res.status(500).send(err));
//   });
