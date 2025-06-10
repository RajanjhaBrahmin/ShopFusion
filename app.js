require('dotenv').config();
const express = require("express");
const router = require("./routes/userRoutes");
const errorHandler = require("./constants/errrorHandling");
const i18n = require('i18n');
const handlebars = require('handlebars');
const path = require('path');
const app = express();


app.use(express.json());

i18n.configure({
    locales: ['en'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en'
});

// Register __ helper for handlebars
handlebars.registerHelper('__', function() {
    return i18n.__.apply(this, arguments);
});

app.use('/api', router);

app.use(errorHandler);
module.exports = app;


