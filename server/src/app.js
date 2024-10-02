const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
// eslint-disable-next-line no-unused-vars
const cron = require('node-cron');
// eslint-disable-next-line no-unused-vars
const { openQueuesForAllStores } = require('./utils/queue');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', userRouter);



module.exports = app;