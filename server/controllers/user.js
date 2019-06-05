const bcrypt = require('bcrypt');
const model = require('../models/user');

const methods = {};

/**
 * Compares user provided password with hashed one
 * @param {String} password 
 * @param {String} hashedPassword 
 * @returns {Boolean}
 */
function comparePasswords(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

methods.createAccount = (email, username, password) => {
    if (model.doesEmailExist(email)) {
        throw new Error('Email already exists');
    }
    if (model.doesUsernameExist(username)) {
        throw new Error('Username already exists');
    }

    model.addUser(email, username, password);
};

methods.login = (email, password) => {
    const user = model.findUserByEmail(email);
    if (user.length === 0) {
        throw new Error('User does not exist');
    }
    if (!comparePasswords(password, user[0].password)) {
        throw new Error('Email or password is incorrect');
    }
    return user[0].userid;
};

methods.getUser = (userid) => {
    const user = model.findUserByUserID(userid);
    if (user.length === 0){
        throw new Error('User does not exist');
    }
    return user;
}

methods.updateAccount = (body) => {
    let userid = (body.discord_id !== undefined) ? model.getUserIDFromDiscordID(body.discord_id) : body.userid;
    console.log(userid);
    methods.getUser(userid);
    
    for(const key of Object.keys(body.data)){
        model.updateUserByUserID(key, body.data[key], userid);
    }
}

module.exports = methods;