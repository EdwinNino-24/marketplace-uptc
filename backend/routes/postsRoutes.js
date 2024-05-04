const express = require('express');

const postsMiddleware = require('../middlewares/postsMiddleware');

const router = express.Router();

router.get('/get_products_posts', postsMiddleware.productsPosts);
router.get('/get_services_posts', postsMiddleware.servicesPosts);
router.post('/get_posts_by_search', postsMiddleware.bySearchPosts);
router.post('/get_my_posts', postsMiddleware.myPosts);

module.exports = router;