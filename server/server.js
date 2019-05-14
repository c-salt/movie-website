require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const withAuth = require('./middleware/authentication');
const errorHandler = require('./utils/error-handler');
const routes = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use basic HTTP auth to secure the api
// app.use(basicAuth);

app.use(routes);
// global error handler
// app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
