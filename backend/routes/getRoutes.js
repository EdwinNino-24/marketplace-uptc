const express = require('express');
const getMiddleware = require('../middlewares/getMiddleware');

const router = express.Router();

router.get('/get_categories', getMiddleware.categories);
router.get('/get_locations', getMiddleware.locations);
router.get('/get_states', getMiddleware.states);
router.get('/get_type_offers', getMiddleware.typesOffer);

module.exports = router;