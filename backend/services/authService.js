const userModel = require('../models/userModel');

const jwtUtils = require('../utils/jwtUtils');

const hashUtils = require('../utils/hashUtils.js');


exports.validateLogin = async (username, password) => {
  try {
    const user = await userModel.fetchUserById(username);

    if (!user) {
      return { code: '0', message: 'Usuario no encontrado', token: null };
    }

    const isPasswordValid = await hashUtils.checkCode(password, user.PASSWORD_HASHED);

    if (!isPasswordValid) {
      return { code: '2', message: 'Contraseña incorrecta', token: null };
    }

    return {
      code: '3',
      message: 'Login exitoso',
      token: await jwtUtils.generateToken(user.ID_ACCOUNT, true, user.STATE_ACCOUNT)
    };
  } catch (error) {

  }
};
