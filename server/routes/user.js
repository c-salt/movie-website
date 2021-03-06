const jwt = require('jsonwebtoken');
const userController = require('../controllers/user');
const withAuth = require('../middleware/authentication');
const app = module.exports = require('express').Router();

const secret = process.env.secret;

// Get user info
app.get('/', withAuth, (req, res, next) => {
    try{
        const user = userController.getAccount(req.body.userid);
        delete user.password;
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({
            errorMessage: err.message
        });
    }
});

//Create user
app.post('/', (req, res, next) => {
    const { email, username, password } = req.body;
    try {
        const userid = userController.createAccount(email, username, password);
        const token = jwt.sign({ userid }, secret, {
            expiresIn: '1h'
          });
        res.cookie('token', token, { httpOnly: true });
        res.sendStatus(201);
    } catch (err) {
        res.status(400).send({
            errorMessage: err.message
        });
    }
});

//Update user info
app.patch('/', withAuth, (req, res, next) => {
    console.log('Patch invoked');
    console.log(req.body);
    try {
        userController.updateAccount(req.body);
        res.sendStatus(204);
    } catch (err) {
        res.status(400).send({
            errorMessage: err.message
        });
    }
});

//Delete user info
app.delete('/', withAuth, (req, res, next) => {
    //console.log('i am deleting ur face, fear me');
    //console.log(req.body);
    res.sendStatus(200);
});

//Check if a user is connected
app.get('/connected', withAuth, (req, res, next) => {
    try {
        userController.getVerified(req.body.discord_id);
        res.sendStatus(200);
    } catch(err) {
        res.status(400).send({
            errorMessage: err.message
        });
    }
});