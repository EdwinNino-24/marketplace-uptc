const recoveryController = require('../controllers/recoveryController');


exports.searchAccountRecover = async (req, res) => {
  try {
    const { email } = req.body;
    recoveryController.searchRecoverAccount(email, res);
  } catch (error) {
  }
};

exports.resendCode = async (req, res) => {
  try {
    const { token } = req.body;
    recoveryController.resendCode(token, res);
  } catch (error) {
  }
};

exports.recoverAccount = async (req, res) => {
  try {
    const { code, token } = req.body;
    recoveryController.recoverAccount(code, token, res);
  } catch (error) {
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, token } = req.body;
    recoveryController.resetPassword(newPassword, token, res);
  } catch (error) {
  }
};
