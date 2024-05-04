const authController = require('../controllers/authController');


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    authController.login(username, password, res);
  } catch (error) {

  }
};

exports.currentUser = async (req, res) => {
  try {
    const token = req.body.token;
    authController.authCurrentUser(token, res);
  } catch (error) {
  }
};