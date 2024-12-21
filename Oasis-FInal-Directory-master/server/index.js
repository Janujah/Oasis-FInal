const connectDb = require('./DB/connect');
const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config()
const app = express();
app.use(bodyParser.json());
const cors = require('cors');


app.use(
    cors({
      origin: ["https://oasis-f-inal-directory.vercel.app"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );
app.use(cors());
app.use(express.json());
connectDb();


