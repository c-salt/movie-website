const app = module.exports = require('express')();

// Get user ratings by username
app.get('/user/:username', (req, res, next) => {
    //console.log(req.params, req.query);
    res.sendStatus(200);
});

// Get movie ratings by imdb id
app.get('/movie/:imdbid', (req, res, next) => {

});

// Get a user's rating by imdbid
app.get('/movie/:imdbid/user/:userid', (req, res, next) => {

});

// Get movie ratings by genre
app.get('/movie/genre', (req, res, next) => {

});
