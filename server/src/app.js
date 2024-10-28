const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const cron = require('node-cron');
const { openQueuesForAllStores } = require('./utils/queue');
const { deleteOldQueuesAndEntries } = require('./utils/queueDelete');
const bodyParser = require('body-parser');
const bot = require('./bot');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/api/shops', userRouter);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });

cron.schedule('01 00 * * *', openQueuesForAllStores);

cron.schedule('07 00 * * *', deleteOldQueuesAndEntries);


module.exports = app;
