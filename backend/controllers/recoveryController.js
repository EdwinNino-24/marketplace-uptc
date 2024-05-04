const userService = require('../services/usersService');
const registerService = require('../services/registerService');
const recoveryService = require('../services/recoveryService');


exports.searchRecoverAccount = async (id, res) => {
    try {
        const accounts = await userService.getUsers(id);

        if (accounts.length > 0) {
            const isSigned = await registerService.isSigned(accounts[0]);
            if (!isSigned) {
                await registerService.resendCode(id);
                res.json({ code: "1" });
            } else {
                const updateCodeRecovery = await recoveryService.updateCodeRecovery(id);
                if (updateCodeRecovery) {
                    const tokenRecovery = await recoveryService.getTokenRecovery(id, false, isSigned);
                    res.json({ code: "2", user: id, token: tokenRecovery });
                }
                else {
                    res.json({ code: "3", message: "error" });
                }
            }
        }
        else {
            res.json({ code: "0", message: "not found" });
        }
    } catch (error) {
    }
};

exports.resendCode = async (token) => {
    try {
        const id = await userService.getUserFromToken(token);
        await recoveryService.resendCode(id);
    } catch (error) {
    }
};

exports.recoverAccount = async (code, token, res) => {
    try {
        const id = await userService.getUserFromToken(token);
        const user = await userService.getUserAccount(id);
        const isValid = await userService.isValidCodeRecover(code, user);
        if (isValid) {
            const tokenRecovery = await recoveryService.getTokenRecovery(id, true, user.STATE_ACCOUNT);
            res.json({ code: "1", token: tokenRecovery });
        }
        else {
            const tokenRecovery = await recoveryService.getTokenRecovery(id, false, user.STATE_ACCOUNT);
            return res.json({ code: "0", token: tokenRecovery });
        }
    } catch (error) {
    }
};

exports.resetPassword = async (password, token, res) => {
    try {
        const id = await userService.getUserFromToken(token);
        const user = await userService.getUserAccount(id);
        const changePassword = await userService.updatePassword(password, user);
        if (changePassword) {
            res.json({ code: 0, token: token});
        }
        else {
            res.json({ code: 1 });
        }
    } catch (error) {
    }
};