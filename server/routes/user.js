const userController = require('../controllers/user');

const app = module.exports = require('express').Router();

// Get user info
app.get('/', (req, res, next) => {
    console.log(req.body);
    res.sendStatus(200);
});

//Create user
app.post('/', (req, res, next) => {
    console.log(req.body);
    const { email, username, password } = req.body;
    console.log(email, username, password);
    try {
        userController.createAccount(email, username, password);
        console.log('User being created');
        res.send({ 
            status: 200, 
            body: {
                success: true
            }
        });
    } catch (err) {
        res.send({
            status: 200,
            body: {
                success: false,
                errorMessage: err.message
            }
        });
    }
});

//Update user info
app.patch('/', (req, res, next) => {
    console.log('i am patching ur mum, fear me');
    console.log(req.body);
    res.sendStatus(200);
});


//Delete user info
app.delete('/', (req, res, next) => {
    console.log('i am deleting ur face, fear me');
    console.log(req.body);
    res.sendStatus(200);
});
