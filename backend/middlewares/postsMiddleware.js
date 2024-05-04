const postsController = require('../controllers/postsController');


exports.productsPosts = async (req, res) => {
  try {
    postsController.sendProductPosts(res);
  } catch (error) {
  }
};

exports.servicesPosts = async (req, res) => {
  try {
    postsController.sendServicesPosts(res);
  } catch (error) {
  }
};

exports.bySearchPosts = async (req, res) => {
  const { search } = req.body;
  try {
    postsController.sendSearchedPosts(search, res);
  } catch (error) {
  }
};

exports.myPosts = async (req, res) => {
  const { token } = req.body;
  try {
    postsController.sendMyPosts(token, res);
  } catch (error) {
  }
};