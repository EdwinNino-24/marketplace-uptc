const jwtUtils = require('../utils/jwtUtils.js');

const hashUtils = require('../utils/hashUtils.js');

const mailUtils = require('../utils/mailUtils.js');

const recoveryModel = require('../models/recoveryModel.js');

const userModel = require('../models/userModel');


exports.updateCodeRecovery = async (id) => {
    try {
        const code_recovery = await hashUtils.generateRandomCode(6);
        const code_recovery_hashed = await hashUtils.hashCode(code_recovery);
        const update = recoveryModel.updateCode(id, code_recovery_hashed);
        if (update) {
            await mailUtils.sendMail("RECUPERA TU CUENTA DE MARKETPLACE - UPTC", "recuperación", id, code_recovery);
            return update;
        }
        return update;
    } catch (error) {
    }
    return false;
};

exports.resendCode = async (id) => {
    try {
        const code_recovery = await hashUtils.generateRandomCode(6);
        const code_recovery_hashed = await hashUtils.hashCode(code_recovery);
        const update = recoveryModel.updateCode(id, code_recovery_hashed);
        if (update) {
            await mailUtils.sendMail("RECUPERA TU CUENTA DE MARKETPLACE - UPTC", "recuperación", id, code_recovery);
            return update;
        }
        return update;
    } catch (error) {
    }
    return false;
};

exports.getTokenRecovery = async (id, session, activate) => {
    try {
        const token = await jwtUtils.generateToken(id, session, activate);
        return token;
    } catch (error) {
    }
    return null;
};