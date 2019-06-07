const userController = require('../controllers/user');
const withAuth = require('../middleware/authentication');
const app = module.exports = require('express').Router();

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
        userController.createAccount(email, username, password);
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
