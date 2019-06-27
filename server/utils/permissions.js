module.exports = {
    canUserAddMovie: function(userid, isFutureMovie) {
        const userModel = require('../models/user');
        const permissionLevel = userModel.getUserPermissionLevel(userid);
        console.log('User permissionLevel: ', permissionLevel, '. permissionLevel Type: ', typeof permissionLevel);
        return (isFutureMovie) ? permissionLevel & this.permission.ADD_MOVIE_FUTURELIST : permissionLevel & this.permission.ADD_MOVIE_SUPERLIST;
    },
    canUserRemoveMovie: function(userid, body) {
        const userModel = require('../models/user');
        const movieModel = require('../models/movie');
        
        const permissionLevel = userModel.getUserPermissionLevel(userid);
        const movieInfo = movieModel.getMovieInfo(body.data.name, body.data.year, body.data.imdbid);
        
        if (movieInfo === undefined) {
            throw new Error('Movie does not exist');
        }
        
        if (movieInfo.added_by !== userid && !(permissionLevel & this.permission.REMOVE_ANY_MOVIE)) {
            throw new Error('User has inadequate permissions to modify movie');
        }
        
        return (movieInfo.future_movie) ? permissionLevel & this.permission.REMOVE_OWN_MOVIE_FUTURELIST : permissionLevel & this.permission.REMOVE_OWN_MOVIE_SUPERLIST;
    },
    canUserUpdateMovie: function(userid) {
        const userModel = require('../models/user');
        const permissionLevel = userModel.getUserPermissionLevel(userid);
        return (permissionLevel & this.permission.ADD_MOVIE_SUPERLIST);
    },
    permission: {
        OWNER: 1,
        RATE_MOVIE: 2,
        ADD_MOVIE_SUPERLIST: 4,
        ADD_MOVIE_FUTURELIST: 8,
        DELETE_ACCOUNT_ANY: 16,
        REMOVE_OWN_MOVIE_SUPERLIST: 32,
        REMOVE_OWN_MOVIE_FUTURELIST: 64,
        REMOVE_ANY_MOVIE: 128,
        CHANGE_PERMISSIONS: 256
    },
    role: {
        DEFAULT: 74, // RATE_MOVIE + ADD_MOVIE_FUTURELIST + REMOVE_MOVIE_FUTURELIST_YOURS
        REDUCED: 2, // RATE_MOVIE
        NONE: 0,
        POWER_USER: 110, //RATE_MOVIE + ADD_MOVIE_SUPERLIST + ADD_MOVIE_FUTURELIST + REMOVE_OWN_MOVIE_SUPERLIST + REMOVE_OWN_MOVIE_FUTURELIST
        ADMIN: 510, // ALL PERMISSIONS (Can't Change Other Admin's Permissions)
        OWNER: 511 // ALL POWERFUL
    }
}