const userModel = require('../models/user');
const movieModel = require('../models/movie');
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
      imdbid: movieInfo.imdbid, 
      title: movieInfo.title, 
      released: movieInfo.released,
      plot: movieInfo.plot,
      poster: movieInfo.poster,
      metascore: movieInfo.metascore,
      imdbrating: movieInfo.imdbrating,
      rottonTomatoesRating,
      future: +body.data.future,
      userid
    }

    console.log(movieData);

    movieModel.addMovie(movieData);
  
    return movieInfo;
  });
};