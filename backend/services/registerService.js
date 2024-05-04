const jwtUtils = require('../utils/jwtUtils');
const hashUtils = require('../utils/hashUtils.js');
const mailUtils = require('../utils/mailUtils.js');
const registerModel = require('../models/registerModel');


exports.isSigned = async (account) => {
    const isSigned = account.STATE_ACCOUNT;
    return isSigned;
};

exports.updateNewUser = async (account, formData) => {
    try {
        const code_activation = await hashUtils.generateRandomCode(6);
        const [passwordHashed, code_activation_hashed, code_recover_hashed] = await Promise.all([
            hashUtils.hashCode(formData.password),
            hashUtils.hashCode(code_activation),
            hashUtils.hashCode(await hashUtils.generateRandomCode(6))
        ]);
        const update = registerModel.updateNewUser(formData, account, passwordHashed, code_activation_hashed, code_recover_hashed);
        if (update) {
            await mailUtils.sendMail("REACTIVA TU CUENTA DE MARKETPLACE - UPTC", "reactivación", formData.email, code_activation);
            return update;
        }
        return update;
    } catch (error) {
    }
    return false;
};

exports.registerNewUser = async (formData) => {
    try {
        const code_activation = await hashUtils.generateRandomCode(6);
        const [passwordHashed, code_activation_hashed, code_recover_hashed] = await Promise.all([
            hashUtils.hashCode(formData.password),
            hashUtils.hashCode(code_activation),
            hashUtils.hashCode(await hashUtils.generateRandomCode(6))
        ]);
        const register = registerModel.registerNewUser(formData, passwordHashed, code_activation_hashed, code_recover_hashed);
        if (register) {
            await mailUtils.sendMail("ACTIVA TU CUENTA DE MARKETPLACE - UPTC", "activación", formData.email, code_activation);
            return register;
        }
        return register;
    } catch (error) {
    }
    return false;
};

exports.resendCode = async (id) => {
    try {
        const code_activation = await hashUtils.generateRandomCode(6);
        const code_activation_hashed = await hashUtils.hashCode(code_activation);
        const activation = await registerModel.updateCode(id, code_activation_hashed);
        if (activation) {
            await mailUtils.sendMail("ACTIVA TU CUENTA DE MARKETPLACE - UPTC", "activación", id, code_activation);
            return activation;
        }
        return activation;
    } catch (error) {
    }
    return false;
};

exports.getTokenRegister = async (id, session, activate) => {
    try {
        const token = await jwtUtils.generateToken(id, session, activate);
        return token;
    } catch (error) {
    }
    return null;
};

exports.activateAccount = async (id) => {
    try {
        const activation = await registerModel.activateAccount(id);
        return activation;
    } catch (error) {
    }
    return false;
};
