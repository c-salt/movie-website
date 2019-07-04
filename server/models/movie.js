const sqlite3 = require('better-sqlite3');
const logger = require('log4js').getLogger('movieModel');
const path = require('path');

const methods = {};

/**
 * Opens up database
 * @returns {sqlite3.Database}
 */
function getDatabase() {
  logger.trace('Entering getDatabase function in server/models/movie.js');

  const db = new sqlite3(path.join(__dirname, 'movieTogetherDB.db'));
  return db;
};

/**
 * Adds movie to the movie list
 */
methods.addMovie = (movieData) => {
  logger.trace('Entering addMovie function in server/models/movie.js');
  logger.debug(`Parameters provided to addMovie function: movieData=${JSON.stringify(movieData)}`);

  logger.trace('Getting database instance from getDatabase function in server/models/movie.js');
  const db = getDatabase();

  logger.info(`Making SQL call to movieTogetherDB: INSERT INTO movies(imdb_id, title, released, plot, poster_url, metascore_rating, imdb_rating, rotten_tomatoes_rating, future_movie, added_by) \
  VALUES (@imdb_id, @title, @released, @plot, @poster_url, @metascore_rating, @imdb_rating, @rotton_tomatoes_rating, @future_movie, @added_by)`);
  db.prepare('INSERT INTO movies(imdb_id, title, released, plot, poster_url, metascore_rating, imdb_rating, rotten_tomatoes_rating, future_movie, added_by) \
              VALUES (@imdb_id, @title, @released, @plot, @poster_url, @metascore_rating, @imdb_rating, @rotton_tomatoes_rating, @future_movie, @added_by)').run(movieData);
};

/**
 * Removes a movie from the movie list
 * @param {String} name
 * @param {String} year
 * @param {String} imdbid
 * @returns {Object}
 */
methods.removeMovie = (name, year, imdbid) => {
  logger.trace('Entering removeMovie function in server/models/movie.js');
  logger.debug(`Parameters provided to removeMovie function: name=${name}, year=${year}, imdbid=${imdbid}`);
  
  logger.trace('Getting database instance from getDatabase function in server/models/movie.js');
  const db = getDatabase();
  if (name && year) {
    logger.info('making SQL call to movieTogetherDB: DELETE FROM movies WHERE title=? AND released=?');
    db.prepare('DELETE FROM movies WHERE title=? AND released=?').run(name, year.toString());
  } else if (imdbid) {
    logger.info('making SQL call to movieTogetherDB: DELETE FROM movies WHERE imdb_id=?');
    db.prepare('DELETE FROM movies WHERE imdb_id=?').run(imdbid);
  }
};

/**
 * Gets the information stored in movie table
 * @param {String} name
 * @param {String} year
 * @param {String} imdbid
 * @returns {Object}
 */
methods.getMovieInfo = (name, year, imdbid) => {
  logger.trace('Entering getMovieInfo function in server/models/movie.js');
  logger.debug(`Parameters provided to getMovieInfo function: name=${name}, year=${year}, imdbid=${imdbid}`);

  logger.trace('Getting database instance from getDatabase function in server/models/movie.js');
  const db = getDatabase();
  
  let movieInfo;
  if (name && year) {
    logger.info('making SQL call to movieTogetherDB: SELECT * FROM movies WHERE title=? AND released=?');
    movieInfo = db.prepare('SELECT * FROM movies WHERE title=? AND released=?').get(name, year.toString());
  } else if (imdbid) {
    logger.info('making SQL call to movieTogetherDB: SELECT * FROM movies where imdb_id=?');
    movieInfo = db.prepare('SELECT * FROM movies where imdb_id=?').get(imdbid);
  }

  logger.info(`movieInfo obtained from movies table: movieInfo=${JSON.stringify(movieInfo)}`);
  return movieInfo;
  
};

/**
 * Updates the information stored in the movie table
 * currently only changes future -> super list
 * @param {String} name
 * @param {String} year
 * @param {String} imdbid
 */
methods.patchMovie = (name, year, imdbid) => {
  logger.trace('Entering patchMovie function in server/models/movie.js');
  logger.debug(`Parameters provided to patchMovie function: name=${name}, year=${year}, imdbid=${imdbid}`);

  logger.trace('Getting database instance from getDatabase function in server/models/movie.js');
  const db = getDatabase();
  
  if (name && year) {
    logger.info('making SQL call to movieTogetherDB: UPDATE movies SET future_movie=0 WHERE title=? AND released=?');
    db.prepare('UPDATE movies SET future_movie=0 WHERE title=? AND released=?').run(name, year.toString());
  } else if (imdbid) {
    logger.info('making SQL call to movieTogetherDB: UPDATE movies SET future_movie=0 WHERE imdb_id=?');
    db.prepare('UPDATE movies SET future_movie=0 WHERE imdb_id=?').run(imdbid);
  }
};

module.exports = methods;