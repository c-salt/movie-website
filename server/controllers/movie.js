const userModel = require('../models/user');
const movieModel = require('../models/movie');
const permissions = require('../utils/permissions');
const omdb = require('../utils/omdb');

const methods = {};

module.exports = methods;

/**
 * Adds a movie to the movie table
 * @param {Object} body
 * @returns {Object}
 */
methods.addMovie = (body) => {
  const userid = (body.discord_id !== undefined) ? userModel.getUserIDFromDiscordID(body.discord_id) : body.userid;
  
  console.log('Checking if user can add movie: ', userid);
  console.log(userModel);
  if (!permissions.canUserAddMovie(userid, body.data.future)){
    throw new Error('User has inadequate permissions to add movie');
  }

  return omdb.getOMDBInfo(body.data.imdbid, body.data.name, body.data.year).then((movieInfo) => {
    console.log(movieInfo);
    
    let rottonTomatoesRating = null;
    for(const key in movieInfo.ratings) {
      if (movieInfo.ratings[key].source === 'Rotten Tomatoes') {
        rottonTomatoesRating = movieInfo.ratings[key].value;
        console.log('Found the tomato rating ', rottonTomatoesRating);
        break;
      }
    }

    console.log(`User: ${userid} is adding movie: ${movieInfo.imdbid} to movie list; Future Movie?: ${body.data.future}`);

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

    console.log(movieData);

    movieModel.addMovie(movieData);
  
    return movieData;
  });
};

/**
 * Deletes a movie from the movie table
 * @param {Object} body
 */
methods.deleteMovie = (body) => {
  const userid = (body.discord_id !== undefined) ? userModel.getUserIDFromDiscordID(body.discord_id) : body.userid;

  if (!permissions.canUserRemoveMovie(userid, body)){
    throw new Error('User has inadequate permissions to remove movie');
  }

  try {
    movieModel.removeMovie(body.data.name, body.data.year, body.data.imdbid);
  } catch (err) {
    throw new Error('Movie does not exist in future or super lists');
  }
};

/**
 * Gets the information on a movie in the movie table
 * @param {Object} body
 * @returns {Object}
 */
methods.getMovie = (body) => {
  const movieInfo = movieModel.getMovieInfo(body.data.name, body.data.year, body.data.imdbid);
  
  if (movieInfo === undefined) {
    throw new Error('Movie not found in super or future lists')
  }

  return movieInfo;
}