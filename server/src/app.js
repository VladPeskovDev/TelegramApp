const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;