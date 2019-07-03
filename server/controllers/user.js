const bcrypt = require('bcrypt');
const logger = require('log4js').getLogger('userController');
const model = require('../models/user');

/**
 * Handles application's user account functionality for Discord and web.
 * 
 * This file handles all of the necessary orchestration required to have
 * the user account functionality. This includes calling proper model functions
 * for creating, deleting, and updating user accounts along with any other necessary
 * functionality.
 *
 * @author Elijah Sattler   <elijah.sattler@c-salt.info>
 * @author Justen Caldwell  <justen.caldwell@c-salt.info>
 *
 * @created   May 03, 2019
 * @modified  Jul 02, 2019
 */

const methods = {};

/**
 * Compares user provided password with hashed one
 * @param {String} password 
 * @param {String} hashedPassword 
 * @returns {Boolean}
 */
function comparePasswords(password, hashedPassword) {
    logger.trace('Entering comparePasswords function in server/controllers/user.js');
    return bcrypt.compareSync(password, hashedPassword);
}

/**
 * Creates a user account with default permissions
 * @param {String} email
 * @param {String} username
 * @param {String} password
 */
methods.createAccount = (email, username, password) => {
    if (model.doesEmailExist(email)) {
        throw new Error('Email already exists');
    }
    if (model.doesUsernameExist(username)) {
        throw new Error('Username already exists');
    }

    return model.addUser(email, username, password);
};

/**
 * Verifies that a user exists and their password is valid
 * @param {String} email
 * @param {String} password
 * @returns {String}
 */
methods.verifyLogin = (email, password) => {
    const user = model.findUserByEmail(email);
    if (user.length === 0) {
        throw new Error('User does not exist');
    }
    if (!comparePasswords(password, user[0].password)) {
        throw new Error('Email or password is incorrect');
    }
    return user[0].userid;
};

/**
 * Returns all account information for a supplied userid
 * @param {String} userid
 * @returns {Object}
 */
methods.getAccount = (userid) => {
    const user = model.findUserByUserID(userid);
    if (user.length === 0){
        throw new Error('User does not exist');
    }
    return user[0];
};

/**
 * Updates an account, can update multiple values at a time
 * @param {Object} body Object containing account fields to update
 */
methods.updateAccount = (body) => {
    const userid = (body.discord_id !== undefined) ? model.getUserIDFromDiscordID(body.discord_id) : body.userid;
    console.log(userid);
    methods.getAccount(userid);
    
    for(const key of Object.keys(body.data)){
        model.updateUserByUserID(key, body.data[key], userid);
    }
};

/**
 * Verifies that a discord_id is connected to a user
 * @param {String} discord_id
 * @returns {Boolean}
 */
methods.getVerified = (discord_id) => {
    model.getUserIDFromDiscordID(discord_id);
    return true;
};

module.exports = methods;