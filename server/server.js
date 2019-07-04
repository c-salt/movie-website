require('rootpath')();
const express = require('express');
const log4js = require('log4js');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cookieParser = require('cookie-parser');

// Create/check that log path exists
try {
  fs.mkdirSync('./logs');
} catch (error) {
  if (error.code !== 'EEXIST') {
    process.exit(1);
  }
}

// Configure logger
log4js.configure('./config/log4js.json');
const logger = log4js.getLogger('server');
logger.debug('Logger initialized and logs path created');

// Configure express app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));
app.use(cookieParser());
app.use(routes);

// Start express
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    logger.info('Server listening on port ' + port);
});
