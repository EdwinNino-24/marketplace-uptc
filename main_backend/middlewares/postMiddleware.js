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

exports.createPost = async (req, res) => {
  const post = {
    "title": req.body.title,
    "type": req.body.type,
    "category": req.body.category,
    "description": req.body.description,
    "price": req.body.price,
    "location": req.body.location,
    "token": req.body.token
  }
  try {
    postController.createPost(post, res);
  } catch (error) {
  }
};

exports.updatePost = async (req, res) => {
  const token = req.body.token;
  const post = {
    id: req.body.id,
    title: req.body.title,
    type: req.body.type,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
  };
  try {
    postController.updatePost(token, post, res);
  } catch (error) {
  }
};

exports.deletePost = async (req, res) => {
  const { publicationId } = req.body;
  try {
    postController.deletePost(publicationId);
  } catch (error) {
  }
};