const logger = require('log4js').getLogger('movieRoute');
const movieController = require('../controllers/movie');
const app = module.exports = require('express')();


// Get a movie
app.get('/', (req, res, next) => {
  logger.trace('Entering GET /movie route in server/routes/movie.js');

  try {
    logger.trace('Calling getMovie function server/controllers/movie.js');
    const movieInfo = movieController.getMovie(req.body);
    logger.debug(`movieInfo returned from getMovie: ${JSON.stringify(movieInfo)}`);

    res.send(movieInfo).status(200);
  } catch (err) {
    logger.error(`Error encountered: ${err}`);
    res.status(400).send({
      errorMessage: err.message
    });
  }
});

// Create and add a movie to the super/future list.
app.post('/', (req, res, next) => {
  logger.trace('Entering POST /movie route in server/routes/movie.js');

  try {
    logger.trace('Calling addMovie function in server/controllers/movie.js');
    movieController.addMovie(req.body).then((movieInfo) => {
      logger.debug('Movie Information in Route: ', movieInfo);
      res.send(movieInfo).status(200);
    }).catch(err => {
      logger.error(`Error encountered: ${err}`);
      res.status(400).send({
        errorMessage: 'Movie was either not found or already added to the list'
      });
    });
  } catch (err) {
      logger.error(`Error encountered: ${err}`);
      res.status(400).send({
          errorMessage: err.message
      });
  }
});

// Delete a movie from the super/future list.
app.delete('/', (req, res, next) => {
  logger.trace('Entering DELETE /movie route in server/routes/movie.js');

  try {
    logger.trace('Calling deleteMovie function in server/controllers/movie.js');
    movieController.deleteMovie(req.body)
    res.sendStatus(204);
  } catch (err) {
    logger.error(`Error encountered: ${err}`);
    res.status(400).send({
      errorMessage: err.message
    })
  }
});

// Patch a movie's information
app.patch('/', (req, res, next) => {
  logger.trace('Entering PATCH /movie route in server/routes/movie.js')

  try {
    logger.trace('Calling patchMovie function in server/controllers/movie.js');
    movieController.patchMovie(req.body)
    res.sendStatus(204);
  } catch (err) {
    logger.error(`Error encountered: ${err}`);
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