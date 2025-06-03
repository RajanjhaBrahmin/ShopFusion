const express = require("express");
const router = require("./routes/userRoutes");
const errorHandler = require("./constants/errrorHandling");
const app = express();
require("dotenv").config();

app.use(express.json());


app.use('/api', router);

app.use(errorHandler);
module.exports = app;


