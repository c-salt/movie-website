const sqlite3 = require('better-sqlite3');
const path = require('path');

const methods = {};

/**
 * Opens up database
 * @returns {sqlite3.Database}
 */
function getDatabase() {
  const db = new sqlite3(path.join(__dirname, 'movieTogetherDB.db'), { verbose: console.log });
  return db;
};

/**
 * Adds movie to the movie list
 */
methods.addMovie = (movieData) => {
  const db = getDatabase();
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
  const db = getDatabase();
  if (name && year) {
    db.prepare('DELETE FROM movies WHERE title=? AND released=?').run(name, year.toString());
  } else if (imdbid) {
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
  const db = getDatabase();
  let movieInfo;
  if (name && year) {
    movieInfo = db.prepare('SELECT * FROM movies WHERE title=? AND released=?').get(name, year.toString());
  } else if (imdbid) {
    movieInfo = db.prepare('SELECT * FROM movies where imdb_id=?').get(imdbid);
  }

  console.log(movieInfo);
  return movieInfo;
  
};

module.exports = methods;