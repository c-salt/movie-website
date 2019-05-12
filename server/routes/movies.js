const app = module.exports = require('express')();

// Get all movies
app.get('/', (req, res, next) => {

});

// Get movie by genre
app.get('/genre', (req, res, next) => {

});

// Get movie by IMDB ID
app.get('/id/:imdbID', (req, res, next) => {

});

// Get all future movies
app.get('/future', (req, res, next) => {

});

// Get all future movies by genre
app.get('/future/genre', (req, res, next) => {

});

// Get movie by year released
app.get('/year/:year', (req, res, next) => {

});