const jwt = require('jsonwebtoken');
const logger = require('log4js').getLogger('userRoute');
const userController = require('../controllers/user');
const withAuth = require('../middleware/authentication');
const app = module.exports = require('express').Router();

const secret = process.env.secret;

// Get user info
app.get('/', withAuth, (req, res, next) => {
    logger.trace('Entering GET /user route in server/routes/user.js');

    try{
        logger.trace('Calling getAccount function in server/controllers/user.js');
        const user = userController.getAccount(req.body.userid);
        delete user.password;
        logger.debug(`Acquired user info: ${JSON.stringify(user)}`);
        res.status(200).send(user);
    } catch (err) {
        logger.error(`Encountered error: ${err}`);
        res.status(400).send({
            errorMessage: err.message
        });
    }
});

//Create user
app.post('/', (req, res, next) => {
    logger.trace('Entering POST /user route in server/routes/user.js');

    const { email, username, password } = req.body;
    try {
        logger.trace('Calling createAccount function in server/controllers/user.js');
        const userid = userController.createAccount(email, username, password);
        logger.debug(`Account successfully created with unique userid: ${userid}`);

        logger.debug('Generating session token');
        const token = jwt.sign({ userid }, secret, {
            expiresIn: '1h'
          });
        
        logger.debug('Storing token in cookies');
        res.cookie('token', token, { httpOnly: true });
        res.sendStatus(201);
    } catch (err) {
        logger.error(`Error encountered: ${err}`);
        res.status(400).send({
            errorMessage: err.message
        });
    }
});

//Update user info
app.patch('/', withAuth, (req, res, next) => {
    logger.trace('Entering PATCH /user route in server/routes/user.js');
    logger.debug(`Body sent to route: ${JSON.stringify(req.body)}`);
    
    try {
        logger.trace('Calling updateAccount function in server/controllers/user.js');
        userController.updateAccount(req.body);
        res.sendStatus(204);
    } catch (err) {
        logger.error(`Error encountered: ${err}`);
        res.status(400).send({
            errorMessage: err.message
        });
    }
});

//Delete user info
app.delete('/', withAuth, (req, res, next) => {
    res.sendStatus(200);
});

//Check if a user is connected
app.get('/connected', withAuth, (req, res, next) => {
    logger.trace('Entering GET /user/connected route entered in server/routes/user.js');

    try {
        logger.trace('Calling getVerified function in server/controllers/user.js');
        userController.getVerified(req.body.discord_id);
        res.sendStatus(200);
    } catch(err) {
        logger.error(`Error encountered: ${err}`);
        res.status(400).send({
            errorMessage: err.message
        });
    }
});