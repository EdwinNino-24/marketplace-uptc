const getController = require('../controllers/getController');


exports.categories = async (req, res) => {
  try {
    getController.sendCategories(res);
  } catch (error) {
  }
};

exports.locations = async (req, res) => {
  try {
    getController.sendLocations(res);
  } catch (error) {
  }
};

exports.states = async (req, res) => {
  try {
    getController.sendStates(res);
  } catch (error) {
  }
};

exports.typesOffer = async (req, res) => {
  try {
    getController.sendTypesOffer(res);
  } catch (error) {
  }
};