const jwt = require('jsonwebtoken');
const app = module.exports = require('express')();
const withAuth = require('../middleware/authentication');
const userController = require('../controllers/user');

const secret = process.env.secret;

// Login
app.post('/', (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userid = userController.verifyLogin(email, password);
    console.log('Session being created');
    const payload = { userid };
    const token = jwt.sign(payload, secret, {
      expiresIn: '1h'
    });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).send({ successMessage: 'Success' });

  } catch (err) {
    console.log('Entered Catch: ', err);
    res.status(401).send({ errorMessage: err.message });
  }
});

// Verify Token
app.get('/verify', withAuth, function(req, res) {
  res.sendStatus(200);
});

// Logout
app.delete('/', (req, res, next) => {

});