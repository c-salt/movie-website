const omdb = new (require('omdbapi'))(process.env.omdb_key);

const methods = {};

methods.getOMDBInfo = (imdbID, name, year) => {
  const options = {
    plot: 'short',
  }

  if (imdbID) {
    options.id = imdbID;
  } else if (name && year) {
    options.title = name;
    options.year = year;
  } else {
    throw new Error('Did not pass imdbID or name/year');
  }
  
  return omdb.get(options);
}

module.exports = methods;