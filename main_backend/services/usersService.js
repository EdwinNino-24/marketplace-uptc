const jwtUtils = require('../utils/jwtUtils');
const hashUtils = require('../utils/hashUtils.js');
const userModel = require('../models/userModel');


exports.getUserFromToken = async (token) => {
    const user = jwtUtils.decodedToken(token);
    return user;
};
exports.getUserSessionFromToken = async (token) => {
    const isValid = jwtUtils.decodedTokenComplete(token);
    return isValid;
};

exports.getPersonalInformation = async (id) => {
    const user = await userModel.fetchPersonalInformationById(id);
    return user;
};

exports.updateUserProfile = async (names, lastnames, id) => {
    try {
        const success = await userModel.updatePersonalInformation(names, lastnames, id);
        if (success) {
            console.log('User profile updated successfully.');
        } else {
            console.log('No changes were made to the user profile.');
        }
        return success;
    } catch (error) {
        console.error('Failed to update user profile:', error);
        return false;
    }
};


exports.getUserAccount = async (id) => {
    const user = await userModel.fetchUserById(id);
    return user;
};

exports.getUsers = async (id) => {
    const users = await userModel.fetchUsersById(id);
    return users;
};

exports.isValidChangePassword = async (password, user) => {
    const isPasswordValid = await hashUtils.checkCode(password, user.PASSWORD_HASHED);
    return isPasswordValid;
};

exports.isValidCodeActivation = async (code, user) => {
    const isValid = await hashUtils.checkCode(code, user.CODE_CONFIRMATION_HASHED);
    return isValid;
};

exports.isValidCodeRecover = async (code, user) => {
    const isValid = await hashUtils.checkCode(code, user.CODE_SECURITY_HASHED);
    return isValid;
};

exports.updatePassword = async (password, user) => {
    const password_hashed = await hashUtils.hashCode(password);
    try {
        const success = await userModel.updatePassword(password_hashed, user);
        if (success) {
            console.log('Password updated successfully.');
            return success;
        } else {
            console.log('No changes were made to the Password.');
        }
        return success;
    } catch (error) {
        console.error('Failed to update Password:', error);
        return false;
    }
};