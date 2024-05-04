const express = require('express');

const postMiddleware = require('../middlewares/postMiddleware');

const router = express.Router();

router.get('/posts/:id', postMiddleware.post);
router.post('/get_post_images', postMiddleware.imagesPost);
router.post('/update_publication_state', postMiddleware.statePost);

module.exports = router;