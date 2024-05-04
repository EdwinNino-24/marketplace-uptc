const userService = require('../services/usersService');
const registerService = require('../services/registerService');


exports.register = async (formData, res) => {
    try {
        const { email } = formData;
        const account = await userService.getUserAccount(email);
        if (account) {
            const isSigned = await registerService.isSigned(account);
            if (isSigned) {
                res.json({ code: "0", message: "An account with this email already exists." });
            }
            else {
                const updateNewUser = await registerService.updateNewUser(account, formData);
                if (updateNewUser) {
                    const tokenUpdateRegister = await registerService.getTokenRegister(email, false, false);
                    res.json({ code: "2", user: email, token: tokenUpdateRegister, message: 'Account successfully updated.' });
                }
                else {
                    res.json({ code: "1", message: "error" });
                }
            }
        } else {
            const registerNewUser = await registerService.registerNewUser(formData);
            if (registerNewUser) {
                const tokenRegister = await registerService.getTokenRegister(email, false, false);
                res.json({ code: "2", user: email, token: tokenRegister, message: 'Account successfully created.' });
            }
            else {
                res.json({ code: "1", message: "error" });
            }
        }
    } catch (error) {
    }
};

exports.codeActivation = async (code, token, res) => {
    try {
        const id = await userService.getUserFromToken(token);
        const user = await userService.getUserAccount(id);
        const isValid = await userService.isValidCodeActivation(code, user);
        if (!isValid) {
            const tokenActivation = await registerService.getTokenRegister(id, false, false);
            return res.json({ user: user, code: "0", token: tokenActivation });
        }
        const activation = await registerService.activateAccount(id);
        if (activation) {
            const tokenActivation = await registerService.getTokenRegister(id, true, true);
            res.json({ code: "1", token: tokenActivation });
        }
        else {
            res.json({ code: "2", token: tokenActivation });
        }
    } catch (error) {
    }
};

exports.resendCode = async (token) => {
    try {
        const id = await userService.getUserFromToken(token);
        await registerService.resendCode(id);
    } catch (error) {
    }
};