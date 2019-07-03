const logger = require('log4js').getLogger('movieController');
const userModel = require('../models/user');
const movieModel = require('../models/movie');
const permissions = require('../utils/permissions');
const omdb = require('../utils/omdb');

/**
 * Handles application's movie functionality for Discord and web.
 *
 * This file handles all of the necessary orchestration required
 * to have the movie functionality. This includes checking permissions
 * of the incoming user, generating and calling the proper database models,
 * and any other manipulation that must occur before returning a response to
 * the consumer of the route.
 *
 * @author Elijah Sattler   <elijah.sattler@c-salt.info>
 * @author Justen Caldwell  <justen.caldwell@c-salt.info>
 *
 * @created   May 03, 2019
 * @modified  Jul 02, 2019
 */

const methods = {};

module.exports = methods;

/**
 * Adds a movie to the movie table
 * @param {Object} body
 * @returns {Object}
 */
methods.addMovie = (body) => {
  logger.trace('Entering addMovie command in server/controllers/movie.js');
  logger.debug(`Body sent to addMovie command: ${JSON.stringify(body)}`);

  const userid = (body.discord_id !== undefined) ? userModel.getUserIDFromDiscordID(body.discord_id) : body.userid;
  
  logger.debug('Checking if user can add movie: ', userid);

  if (!permissions.canUserAddMovie(userid, body.data.future)){
    logger.error('Throwing error: User has inadequate permissions');
    throw new Error('User has inadequate permissions to add movie');
  }

  logger.trace('Calling getOMDBInfo in server/utils/omdb.js');
  return omdb.getOMDBInfo(body.data.imdbid, body.data.name, body.data.year).then((movieInfo) => {
    logger.info(`Obtained omdb info: ${movieInfo}`);
    
    let rottonTomatoesRating = null;
    for(const key in movieInfo.ratings) {
      if (movieInfo.ratings[key].source === 'Rotten Tomatoes') {
        rottonTomatoesRating = movieInfo.ratings[key].value;
        logger.debug('Found the tomato rating: ', rottonTomatoesRating);
        break;
      }
    }

    logger.info(`User: ${userid} is adding movie: ${movieInfo.imdbid} to movie list; Future Movie?: ${body.data.future}`);

    const movieData = {
      imdb_id: movieInfo.imdbid, 
      title: movieInfo.title, 
      released: movieInfo.year,
      plot: movieInfo.plot,
      poster_url: movieInfo.poster,
      metascore_rating: movieInfo.metascore,
      imdb_rating: movieInfo.imdbrating,
      rotton_tomatoes_rating: rottonTomatoesRating,
      future_movie: +body.data.future,
      added_by: userid
    }
    logger.info(`Generated data object for movies table: ${movieData}`);

    logger.trace('Calling addMovie in server/models/movie.js');
    movieModel.addMovie(movieData);
  
    return movieData;
  });
};

/**
 * Deletes a movie from the movie table
 * @param {Object} body
 */
methods.deleteMovie = (body) => {
  logger.trace('Entering deleteMovie function in server/controllers/movie.js');
  logger.debug(`Body sent to deleteMovie command: ${JSON.stringify(body)}`);

  const userid = (body.discord_id !== undefined) ? userModel.getUserIDFromDiscordID(body.discord_id) : body.userid;

  if (!permissions.canUserRemoveMovie(userid, body)){
    logger.error('Error encountered: User has incorrect permissions for deleting a movie');
    throw new Error('User has inadequate permissions to remove movie');
  }

  try {
    logger.trace('Calling removeMovie command in server/models/movie.js');
    movieModel.removeMovie(body.data.name, body.data.year, body.data.imdbid);
  } catch (err) {
    logger.error(`Error encountered: ${err}`);
    throw new Error('Movie does not exist in future or super lists');
  }
};

/**
 * Patches a movie in the movie table
 * @param {Object} body
 */
methods.patchMovie = (body) => {
  logger.trace('Entering patchMovie function in server/controllers/movie.js');
  logger.debug(`Body sent to patchMovie command: ${JSON.stringify(body)}`);

  const userid = (body.discord_id !== undefined) ? userModel.getUserIDFromDiscordID(body.discord_id) : body.userid;
  
  logger.trace('Calling getMovieInfo function in server/models/movie.js');
  const movieInfo = movieModel.getMovieInfo(body.data.name, body.data.year, body.data.imdbid);
  logger.debug(`Returned movieInfo from getMovieInfo: ${JSON.stringify(movieInfo)}`);

  if (!movieInfo) {
    logger.error('Throwing error: Movie was not found in movies table');
    throw new Error('Movie does not exist in future or super lists');
  }

  if (!movieInfo.future_movie) {
    logger.error('Throwing error: The movie already exists in the movie super list');
    throw new Error('Movie is already in the Super List');
  }

  if (!permissions.canUserUpdateMovie(userid)){
    logger.error('Throwing error: User has inadequate permissions');
    throw new Error('User has inadequate permissions to modify movie');
  }

  try {
    logger.trace('Calling patchMovie function in server/models/movie.js');
    movieModel.patchMovie(body.data.name, body.data.year, body.data.imdbid);
  } catch (err) {
    logger.error(`Encountered error: ${err}`);
    throw new Error('Could not change movie list');
  }
};

/**
 * Gets the information on a movie in the movie table
 * @param {Object} body
 * @returns {Object}
 */
methods.getMovie = (body) => {
  logger.trace('Entering getMovie function in server/controllers/movie.js');  
  logger.debug(`Body sent to getMovie command: ${JSON.stringify(body)}`);

  logger.trace('Calling getMovieInfo function in server/models/movie.js');
  const movieInfo = movieModel.getMovieInfo(body.data.name, body.data.year, body.data.imdbid);
  
  if (movieInfo === undefined) {
    logger.error('Encountered error: Movie was retured undefined, meaning it wasn\t found in the table');
    throw new Error('Movie not found in super or future lists')
  }

  return movieInfo;
}
