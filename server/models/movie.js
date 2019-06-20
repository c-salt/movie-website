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
 * Adds movie to the movie list;
 */
methods.addMovie = (movieData) => {
  const db = getDatabase();
  db.prepare('INSERT INTO movies(imdb_id, title, released, plot, poster_url, metascore_rating, imdb_rating, rotten_tomatoes_rating, future_movie, added_by) \
              VALUES (@imdbid, @title, @released, @plot, @poster, @metascore, @imdbrating, @rottonTomatoesRating, @future, @userid)').run(movieData);
};

module.exports = methods;