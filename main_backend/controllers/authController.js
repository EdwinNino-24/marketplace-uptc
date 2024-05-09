const authService = require('../services/authService');
const userService = require('../services/usersService');

exports.login = async (username, password, res) => {
  try {
    const validationResponse = await authService.validateLogin(username, password);
    res.json(validationResponse);
  } catch (error) {
  }
};

exports.authCurrentUser = async (token, res) => {
  try {
    const state = await userService.getUserSessionFromToken(token);
    res.json({ isValid: state });
  } catch (error) {
  }
};