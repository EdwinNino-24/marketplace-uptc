const postController = require('../controllers/postController');

exports.post = async (req, res) => {
  const { id } = req.params;
  try {
    postController.getPost(id, res);
  } catch (error) {
  }
};

exports.imagesPost = async (req, res) => {
  const { folderPath } = req.body;
  try {
    postController.getImagesPost(folderPath, res);
  } catch (error) {
  }
};

exports.statePost = async (req, res) => {
  const { publicationId, newState } = req.body;
  try {
    postController.updateStatePost(publicationId, newState);
  } catch (error) {
  }
};

