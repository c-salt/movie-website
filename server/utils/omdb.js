const omdb = new (require('omdbapi'))(process.env.omdb_key);
const logger = require('log4js').getLogger('omdbUtil');

const methods = {};

methods.getOMDBInfo = (imdbID, name, year) => {
  logger.trace('Entering getOMDBInfo function in server/utils/omdb.js');
  logger.debug(`Paramteters sent to getOMDBInfo: imdbID=${imdbID}, name=${name}, year=${year}`);

  const options = {
    plot: 'short',
  }

  if (imdbID) {
    options.id = imdbID;
  } else if (name && year) {
    options.title = name;
    options.year = year;
  } else {
    logger.error('imdbid or name/year combo was not sent to getOMDBInfo function');
    throw new Error('Did not pass imdbID or name/year');
  }
  
  logger.info(`Calling omdb api with options: ${JSON.stringify(options)}`);
  return omdb.get(options);
}

module.exports = methods;