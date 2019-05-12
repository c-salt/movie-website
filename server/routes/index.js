const app = module.exports = require('express').Router();

app.use('/biggay', (req, res, next) => {
    console.log('test');
    res.sendStatus(200);
});
app.use('/user', require('./user'));
app.use('/session', require('./session'));
app.use('/ratings', require('./ratings'));
app.use('/movies', require('./movies'));