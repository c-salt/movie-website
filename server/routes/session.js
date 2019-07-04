const jwt = require('jsonwebtoken');
const logger = require('log4js').getLogger('sessionRoute');
const app = module.exports = require('express')();
const withAuth = require('../middleware/authentication');
const userController = require('../controllers/user');

const secret = process.env.secret;

// Login
app.post('/', (req, res, next) => {
  logger.trace('Entering POST /session route in server/routes/session.js');

  const { email, password } = req.body;
  logger.debug(`Route sent email=${email}`);

  try {
    logger.trace('Calling verifyLogin function in server/controllers/user.js');
    const userid = userController.verifyLogin(email, password);
    
    logger.info(`Session being created for user: ${userid}`);
    const payload = { userid };
    const token = jwt.sign(payload, secret, {
      expiresIn: '1h'
    });
    res.cookie('token', token, { httpOnly: true });
    res.sendStatus(200);

  } catch (err) {
    logger.error('Error encountered: ', err);
    res.status(401).send({ errorMessage: err.message });
  }
});

// Verify Token
app.get('/verify', withAuth, function(req, res) {
  logger.trace('Entering GET /session/verify route in server/routes/sessions.js');
  res.sendStatus(200);
});

// Logout
app.delete('/', (req, res, next) => {

});