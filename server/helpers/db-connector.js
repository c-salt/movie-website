const sqlite3 = require('better-sqlite3');

const methods = {};
const USER_ID_LENGTH = 6;

/**
 * Returns random integer of a given length
 * @param {Integer} length
 * @returns {Integer}
 */
function randomFixedInteger(length = USER_ID_LENGTH) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

/**
 * Opens up database
 * @returns {sqlite3.Database}
 */
function getDatabase() {
    const db = new sqlite3('./db/movieTogetherDB.db', { verbose: console.log });
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
    db.prepare('INSERT INTO users(userid,email,username,password,discord_id,email_verified,discord_verified) VALUES (?,?,?,?,?,?,?)').run(
          userid, email, username, password, null, email_verified, discord_verified
    );
};

/**
 * Returns all users in the database
 * @returns {List}
 */
methods.getAllUsers = () => {
    const db = getDatabase();
    const rows = db.prepare('SELECT * FROM users').all();
    console.log(rows);
    return rows;
}

module.exports = methods;