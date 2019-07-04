const sqlite3 = require('better-sqlite3');
const logger = require('log4js').getLogger('userModel');
const path = require('path');
const bcrypt = require('bcrypt');
const permission = require('../utils/permissions');

const methods = {};
const USER_ID_LENGTH = 6;

module.exports = methods;

/**
 * Salts and hashes provided password
 * @param {String} password
 * @returns {String}
 */
function saltAndHashPassword(password) {
    logger.trace('Entering saltAndHashPassword function in server/models/user.js');
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

/**
 * Returns random integer of a given length
 * @param {Number} length
 * @returns {Number}
 */
function randomFixedInteger(length = USER_ID_LENGTH) {
    logger.trace('Entering randomFixedInteger function in server/models/user.js');
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

/**
 * Opens up database
 * @returns {sqlite3.Database}
 */
function getDatabase() {
    logger.trace('Entering getDatabase function in server/models/user.js');
    const db = new sqlite3(path.join(__dirname, 'movieTogetherDB.db'));
    return db;
}

/**
 * Adds user to database
 * @param {String} email
 * @param {String} username
 * @param {String} password
 */
methods.addUser = (email, username, password) => {
    logger.trace('Entering addUser function in server/models/user.js');
    logger.debug(`Parameters sent to addUser function: email=${email}, username=${username}`);

    logger.trace('Getting database instance from getDatabase function in server/models/user.js');
    const db = getDatabase();

    const userid = randomFixedInteger().toString();
    const email_verified = 0;
    const discord_verified = 0;
    const hashedPassword = saltAndHashPassword(password);
    const permission_level = permission.role.DEFAULT;

    logger.info('making SQL call to movieTogetherDB: INSERT INTO users(userid,email,username,password,discord_id,email_verified,discord_verified,permission_level) VALUES (?,?,?,?,?,?,?,?)');
    db.prepare('INSERT INTO users(userid,email,username,password,discord_id,email_verified,discord_verified,permission_level) VALUES (?,?,?,?,?,?,?,?)').run(
          userid, email, username, hashedPassword, null, email_verified, discord_verified, permission_level
    );

    return userid;
};

/**
 * Checks to see if email already exists in database
 * @param {String} email
 * @returns {Boolean}
 */
methods.doesEmailExist = (email) => {
    logger.trace('Entering doesEmailExist function in server/models/user.js');
    logger.debug(`Parameters sent to doesEmailExist function: email=${email}`);

    logger.trace('Getting database instance from getDatabase function in server/models/user.js');
    const db = getDatabase();
    
    logger.info('making SQL call to movieTogetherDB: SELECT * FROM users WHERE email=?');
    const emailExists = db.prepare('SELECT * FROM users WHERE email=?').all(email).length !== 0;
    
    logger.info(`Determined emailExists=${emailExists}`);
    return emailExists;
}

/**
 * Checks to see if username already exists in database
 * @param {String} username
 * @returns {Boolean}
 */
methods.doesUsernameExist = (username) => {
    logger.trace('Entering doesUsernameExist function in server/models/user.js');
    logger.debug(`Parameters sent to doesUsernameExist function: username=${username}`);

    logger.trace('Getting database instance from getDatabase function in server/models/user.js');
    const db = getDatabase();

    logger.info('making SQL call to movieTogetherDB: SELECT * FROM users WHERE username=?');
    const usernameExists = db.prepare('SELECT * FROM users WHERE username=?').all(username).length !== 0;
    
    logger.info(`Determined usernameExists=${usernameExists}`);
    return usernameExists;
}

/**
 * Returns all users in the database
 * @returns {Array}
 */
methods.getAllUsers = () => {
    logger.trace('Entering doesUsernameExist function in server/models/user.js');

    logger.trace('Getting database instance from getDatabase function in server/models/user.js');
    const db = getDatabase();
    
    logger.info('making SQL call to movieTogetherDB: SELECT * FROM users');
    const rows = db.prepare('SELECT * FROM users').all();

    return rows;
}

/**
 * Returns user information for a given email
 * @param {String} email
 * @returns {Object}
 */
methods.findUserByEmail = (email) => {
    logger.trace('Entering findUserByEmail function in server/models/user.js');
    logger.debug(`Parameters sent to findUserByEmail function: email=${email}`);

    logger.trace('Getting database instance from getDatabase function in server/models/user.js');
    const db = getDatabase();

    logger.info('making SQL call to movieTogetherDB: SELECT * FROM users WHERE email=?');
    const rows = db.prepare('SELECT * FROM users WHERE email=?').all(email);

    return rows;
}

/**
 * Returns user information for a given userID
 * @param {String} userid
 * @returns {Object}
 */
methods.findUserByUserID = (userid) => {
    logger.trace('Entering findUserByUserID function in server/models/user.js');
    logger.debug(`Parameters sent to findUserByUserID function: userid=${userid}`);

    logger.trace('Getting database instance from getDatabase function in server/models/user.js');
    const db = getDatabase();

    logger.info('making SQL call to movieTogetherDB: SELECT * FROM users WHERE userid=?');
    const rows = db.prepare('SELECT * FROM users WHERE userid=?').all(userid);
    return rows;
}

/**
 * Update any of a users fields for a given userID
 * @param {String} key
 * @param {String} value
 * @param {String} userid
 */
methods.updateUserByUserID = (key, value, userid) => {
    logger.trace('Entering updateUserByUserID function in server/models/user.js');
    logger.debug(`Parameters sent to updateUserByUserID function: key=${key}, userid=${userid}`);
    
    logger.trace('Getting database instance from getDatabase function in server/models/user.js');
    const db = getDatabase();
    
    switch (key) {
        case 'discord_id': 
            logger.info('making SQL call to movieTogetherDB: UPDATE users SET discord_id=? WHERE userid=?');
            db.prepare('UPDATE users SET discord_id=? WHERE userid=?').run(value, userid);
            break;
        case 'username': 
            logger.info('making SQL call to movieTogetherDB: UPDATE users SET username=? WHERE userid=?');
            db.prepare('UPDATE users SET username=? WHERE userid=?').run(value, userid);
            break;
        case 'password':
            logger.info('making SQL call to movieTogetherDB: UPDATE users SET password=? WHERE userid=?');
            db.prepare('UPDATE users SET password=? WHERE userid=?').run(value, userid);
            break;
        case 'email': 
            logger.info('making SQL call to movieTogetherDB: UPDATE users SET email=? WHERE userid=?');
            db.prepare('UPDATE users SET email=? WHERE userid=?').run(value, userid);
            break;
        case 'email_verified':
            logger.info('making SQL call to movieTogetherDB: UPDATE users SET email_verified=? WHERE userid=?');
            db.prepare('UPDATE users SET email_verified=? WHERE userid=?').run(value, userid);
            break;
        case 'discord_verified':
            logger.info('making SQL call to movieTogetherDB: UPDATE users SET discord_verified=? WHERE userid=?');
            db.prepare('UPDATE users SET discord_verified=? WHERE userid=?').run(value, userid);
            break;
        default:
            logger.error('The key passed was invalid');
            throw new Error('Invalid key passed');
    }
}

/**
 * Gets the userid that a discord_id is connected to
 * @param {String} discord_id
 * @returns {String}
 */
methods.getUserIDFromDiscordID = (discord_id) => {
    logger.trace('Entering getUserIDFromDiscordID function in server/models/user.js');
    logger.debug(`Parameters sent to getUserIDFromDiscordID function: discord_id=${discord_id}`);

    logger.trace('Getting database instance from getDatabase function in server/models/user.js');
    const db = getDatabase();

    logger.info('making SQL call to movieTogetherDB: SELECT userid FROM users WHERE discord_id=?')
    const userid = db.prepare('SELECT userid FROM users WHERE discord_id=?').all(discord_id);
    
    if (userid.length === 1) {
        logger.info(`userid ${userid[0].userid} is connected to provided discord_id`);
        return userid[0].userid;
    } else {
        logger.error('The userid for supplied discord id was not found');
        throw new Error('Discord account not attached to a UserID');
    }
}

/**
 * Gets the user permission level integer
 * @param {String} userid
 * @returns {String}
 */
methods.getUserPermissionLevel = (userid) => {
    logger.trace('Entering getUserPermissionLevel function in server/models/user.js');
    logger.debug(`Parameters sent to getUserPermissionLevel function: userid=${userid}`);

    logger.trace('Getting database instance from getDatabase function in server/models/user.js');
    const db = getDatabase();
    
    logger.info('making SQL call to movieTogetherDB: SELECT permission_level FROM users WHERE userid=?')
    const permissionLevel = db.prepare('SELECT permission_level FROM users WHERE userid=?').all(userid);
    
    if (permissionLevel.length === 1) {
        logger.info(`permissionLevel ${permissionLevel[0].permission_level} obtained from users table`);
        return permissionLevel[0].permission_level;
    } else {
        logger.error('The permission level was not found for the supplied userid');
        throw new Error('Permission level not found for supplied UserID');
    }
}