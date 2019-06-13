const userModel = require('../models/user');
console.log(require('../models/user'));
const permissions = require('../utils/permissions');
const omdb = require('../utils/omdb');

const methods = {};

module.exports = methods;

methods.addMovie = (body) => {
  const userid = (body.discord_id !== undefined) ? userModel.getUserIDFromDiscordID(body.discord_id) : body.userid;
  
  console.log('Checking if user can add movie: ', userid);
  console.log(userModel);
  if (!permissions.canUserAddMovie(userid, body.data.future)){
    throw new Error('User has inadequate permissions to add movie');
  }

  return omdb.getOMDBInfo(body.data.imdbID, body.data.name, body.data.year).then((movieInfo) => {
    console.log('Movie info from OMDB: ', movieInfo);
  });
};