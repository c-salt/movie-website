const bcrypt = require('bcrypt');
const model = require('../models/user');

const methods = {};

function saltAndHashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

methods.createAccount = (email, username, password) => {
    if (model.doesEmailExist()) {
        throw new Error('Email already exists');
    }
    if (model.doesUsernameExist()) {
        throw new Error('Username already exists');
    }
    const hashedPassword = saltAndHashPassword(password);

    model.addUser(email, username, hashedPassword);
};

module.exports = methods;