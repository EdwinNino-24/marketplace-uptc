const userService = require('../services/usersService');


exports.userProfile = async (token, res) => {
  try {
    const user = await userService.getUserFromToken(token);
    const personalInformation = await userService.getPersonalInformation(user);
    res.json(personalInformation);
  } catch (error) {
  }
};

exports.personalInformationProfile = async (token, names, lastnames, res) => {
  try {
    const user = await userService.getUserFromToken(token);
    const success = await userService.updateUserProfile(names, lastnames, user);
    if (success) {
      res.json({ code: 0 });
    }
    else {
      res.json({ code: 1 });
    }
  } catch (error) {
  }
};

exports.passwordProfile = async (token, current_password, new_password, res) => {
  try {
    const user = await userService.getUserFromToken(token);
    const userAccount = await userService.getUserAccount(user);
    const isValid = await userService.isValidChangePassword(current_password, userAccount);
    if (isValid) {
      await userService.updatePassword(new_password, userAccount);
      res.json({ code: 1 });
    }
    else {
      res.json({ code: 0 });
    }
  } catch (error) {
  }
};

exports.deleteAccount = async (token, password, res) => {
  try {
    const user = await userService.getUserFromToken(token);
    const userAccount = await userService.getUserAccount(user);
    const isValid = await userService.isValidChangePassword(password, userAccount);
    if (isValid) {
      await userService.deleteAccount(userAccount);
      res.json({ code: 1 });
    }
    else {
      res.json({ code: 0 });
    }
  } catch (error) {
  }
};
