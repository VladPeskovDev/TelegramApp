const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const cron = require('node-cron');
const { openQueuesForAllStores } = require('./utils/queue');
const { deleteQueuesAndEntriesForToday } = require('./utils/queueDelete');
const bodyParser = require('body-parser');
const bot = require('./bot');

const app = express();

app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/shops', userRouter);

cron.schedule('38 12 * * *', openQueuesForAllStores);
cron.schedule('54 21 * * *', deleteQueuesAndEntriesForToday);

module.exports = app;
