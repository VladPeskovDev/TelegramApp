const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const cron = require('node-cron');
const { openQueuesForAllStores } = require('./utils/queue');
const { deleteQueuesAndEntriesForToday } = require('./utils/queueDelete');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', userRouter);

cron.schedule('44 21 * * *', openQueuesForAllStores);
cron.schedule('54 21 * * *', deleteQueuesAndEntriesForToday);



module.exports = app;