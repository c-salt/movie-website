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
    logger.trace('Entering traceAccoutn function in server/controllers/user.js');
    logger.debug(`Parameters sent to createAccount function: email=${email}, username=${username}`);

    if (model.doesEmailExist(email)) {
        logger.error(`User provided email: ${email} already exists`);
        throw new Error('Email already exists');
    }
    if (model.doesUsernameExist(username)) {
        logger.error(`User provided username: ${username} already exists`);
        throw new Error('Username already exists');
    }

    logger.trace('Calling addUser function in server/models/user.js');
    return model.addUser(email, username, password);
};

/**
 * Verifies that a user exists and their password is valid
 * @param {String} email
 * @param {String} password
 * @returns {String}
 */
methods.verifyLogin = (email, password) => {
    logger.trace('Entering verifyLogin function in server/controllers/user.js');
    logger.debug(`Parameter sent to verifyLogin fuction: email=${email}`);

    logger.trace('Calling findUserByEmail function in server/models/user.js');
    const user = model.findUserByEmail(email);
    if (user.length === 0) {
        logger.error('User was not found in movieTogetherDB');
        throw new Error('User does not exist');
    }
    if (!comparePasswords(password, user[0].password)) {
        logger.error('User provided password was determined invalid');
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
    logger.trace('Entering getAccount function in server/controllers/user.js')
    logger.debug(`Parameters sent to getAccount function: userid=${userid}`);
    
    logger.trace('Calling findUserByUserID function in server/models/user.js');
    const user = model.findUserByUserID(userid);
    if (user.length === 0){
        logger.error('Did not find the user in the movieTogetherDB');
        throw new Error('User does not exist');
    }
    return user[0];
};

/**
 * Updates an account, can update multiple values at a time
 * @param {Object} body Object containing account fields to update
 */
methods.updateAccount = (body) => {
    logger.trace('Entering updateAccount function in server/controllers/user.js');
    logger.debug(`Parameters sent to updateAccount function: body=${JSON.stringify(body)}`);

    logger.trace('Calling getUserIDFromDiscordID function in server/models/user.js');
    const userid = (body.discord_id !== undefined) ? model.getUserIDFromDiscordID(body.discord_id) : body.userid;
    logger.debug(`userid retrieved from movieTogetherDB: ${userid}`);

    // TODO: Talk to Elijah about what this call is actually doing
    // I think it may just be using it for the Error that can be thrown stopping
    // The processing under it.
    logger.trace('Calling getAccount function in server/controllers/userid');
    methods.getAccount(userid);
    
    for(const key of Object.keys(body.data)){
        logger.trace('Calling updateUserByUserID function in server/models/user.js');
        model.updateUserByUserID(key, body.data[key], userid);
    }
};

/**
 * Verifies that a discord_id is connected to a user
 * @param {String} discord_id
 * @returns {Boolean}
 */
methods.getVerified = (discord_id) => {
    logger.trace('Entering getVerified function in server/controllers/user.js');
    logger.debug(`Parameters sent to getVerified: ${discord_id}`);

    logger.trace('Calling getUserIDFromDiscordID function in server/models/user.js');
    model.getUserIDFromDiscordID(discord_id);
    return true;
};

module.exports = methods;
