const sqlite3 = require('better-sqlite3');
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
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

/**
 * Returns random integer of a given length
 * @param {Number} length
 * @returns {Number}
 */
function randomFixedInteger(length = USER_ID_LENGTH) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

/**
 * Opens up database
 * @returns {sqlite3.Database}
 */
function getDatabase() {
    const db = new sqlite3(path.join(__dirname, 'movieTogetherDB.db'), { verbose: console.log });
    return db;
}

/**
 * Adds user to database
 * @param {String} email
 * @param {String} username
 * @param {String} password
 */
methods.addUser = (email, username, password) => {
    const db = getDatabase();
    const userid = randomFixedInteger().toString();
    const email_verified = 0;
    const discord_verified = 0;
    const hashedPassword = saltAndHashPassword(password);
    const permission_level = permission.role.DEFAULT;

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
    const db = getDatabase();
    const emailExists = db.prepare('SELECT * FROM users WHERE email=?').all(email).length !== 0;
    return emailExists;
}

/**
 * Checks to see if username already exists in database
 * @param {String} username
 * @returns {Boolean}
 */
methods.doesUsernameExist = (username) => {
    const db = getDatabase();
    const usernameExists = db.prepare('SELECT * FROM users WHERE username=?').all(username).length !== 0;
    return usernameExists;
}

/**
 * Returns all users in the database
 * @returns {Array}
 */
methods.getAllUsers = () => {
    const db = getDatabase();
    const rows = db.prepare('SELECT * FROM users').all();
    //console.log(rows);
    return rows;
}

/**
 * Returns user information for a given email
 * @param {String} email
 * @returns {Object}
 */
methods.findUserByEmail = (email) => {
    const db = getDatabase();
    const rows = db.prepare('SELECT * FROM users WHERE email=?').all(email);
    return rows;
}

/**
 * Returns user information for a given userID
 * @param {String} userid
 * @returns {Object}
 */
methods.findUserByUserID = (userid) => {
    const db = getDatabase();
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
    const db = getDatabase();
    switch (key) {
        case 'discord_id': 
            db.prepare('UPDATE users SET discord_id=? WHERE userid=?').run(value, userid);
            break;
        case 'username': 
            db.prepare('UPDATE users SET username=? WHERE userid=?').run(value, userid);
            break;
        case 'password': 
            db.prepare('UPDATE users SET password=? WHERE userid=?').run(value, userid);
            break;
        case 'email': 
            db.prepare('UPDATE users SET email=? WHERE userid=?').run(value, userid);
            break;
        case 'email_verified': 
            db.prepare('UPDATE users SET email_verified=? WHERE userid=?').run(value, userid);
            break;
        case 'discord_verified':
            db.prepare('UPDATE users SET discord_verified=? WHERE userid=?').run(value, userid);
            break;
        default:
            throw new Error('Invalid key passed');
    }
}

/**
 * Gets the userid that a discord_id is connected to
 * @param {String} discord_id
 * @returns {String}
 */
methods.getUserIDFromDiscordID = (discord_id) => {
    const db = getDatabase();
    const userid = db.prepare('SELECT userid FROM users WHERE discord_id=?').all(discord_id);
    if (userid.length === 1) {
        return userid[0].userid;
    } else {
        throw new Error('Discord account not attached to a UserID');
    }
}

/**
 * Gets the user permission level integer
 * @param {String} userid
 * @returns {String}
 */
methods.getUserPermissionLevel = (userid) => {
    const db = getDatabase();
    const permissionLevel = db.prepare('SELECT permission_level FROM users WHERE userid=?').all(userid);
    if (permissionLevel.length === 1) {
        return permissionLevel[0].permission_level;
    } else {
        throw new Error('Permission level not found for supplied UserID');
    }
}