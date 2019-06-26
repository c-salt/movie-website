const movieController = require('../controllers/movie');
const app = module.exports = require('express')();


// Get a movie
app.get('/', (req, res, next) => {
  try {
    const movieInfo = movieController.getMovie(req.body);
    res.send(movieInfo).status(200);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: err.message
    });
  }
});

// Create and add a movie to the super/future list.
app.post('/', (req, res, next) => {
  try {
    console.log(`Calling addMovie function with body: ${req.body}`);
    movieController.addMovie(req.body).then((movieInfo) => {
      console.log('Movie Information in Route: ', movieInfo);
      res.send(movieInfo).status(200);
    }).catch(err => {
      console.log(err);
      res.status(400).send({
        errorMessage: 'Movie was either not found or already added to the list'
      });
    });
  } catch (err) {
      res.status(400).send({
          errorMessage: err.message
      });
  }
});

// Delete a movie from the super/future list.
app.delete('/', (req, res, next) => {
  try {
    movieController.deleteMovie(req.body)
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: err.message
    })
  }
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