const registerController = require('../controllers/registerController');


exports.register = async (req, res) => {
  try {
    const formData = req.body;
    registerController.register(formData, res);
  } catch (error) {
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { code, token } = req.body;
    registerController.codeActivation(code, token, res);
  } catch (error) {
  }
};

exports.resendCode = async (req, res) => {
  try {
    const { token } = req.body;
    registerController.resendCode(token);
  } catch (error) {
  }
};