const userController = require('../controllers/userController');


exports.userProfile = async (req, res) => {
  try {
    const token = req.body.token;
    userController.userProfile(token, res);
  } catch (error) {
  }
};

exports.personalInformationProfile = async (req, res) => {
  try {
    const { token, names, lastnames } = req.body;
    userController.personalInformationProfile(token, names, lastnames, res);
  } catch (error) {
  }
};

exports.passwordProfile = async (req, res) => {
  try {
    const { token, current_password, new_password } = req.body;
    userController.passwordProfile(token, current_password, new_password, res);
  } catch (error) {
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { token, password } = req.body;
    userController.deleteAccount(token, password, res);
  } catch (error) {
  }
};