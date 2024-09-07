const express = require('express')
const cors = require('cors')
// import { json, urlencoded } from 'body-parser';
const { json, urlencoded } = require('body-parser');

require('dotenv').config();

const app = express();

// Middleware for CORS and JSON parsing
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(json());
app.use(urlencoded({ extended: true })); // To handle form data sent by SSLCommerz

// Logging all the requests coming to server
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

// Connecting to MongoDB
require("./database");

app.use("/payment", require("./paymentRoute"));

app.listen(process.env.PORT, (error) => {
    if(error){
        console.error(`Server start error: ${error}`);
        process.exit(-1);
    }
    console.info(`Server started in ${process.env.ENVIRONMENT} mode on port ${process.env.PORT}`);
});
