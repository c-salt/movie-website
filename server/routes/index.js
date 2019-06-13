const app = module.exports = require('express').Router();

app.get('/biggay', (req, res, next) => {
    console.log('test');
    res.sendStatus(401);
});
app.use('/user', require('./user'));
app.use('/session', require('./session'));
app.use('/ratings', require('./ratings'));
app.use('/movie', require('./movie'));