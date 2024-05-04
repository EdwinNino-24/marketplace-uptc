const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();

router.post('/login', authMiddleware.login);
router.post('/verify_current_user', authMiddleware.currentUser);

router.post('/user_profile', userMiddleware.userProfile);
router.post('/change_personal_information', userMiddleware.personalInformationProfile);
router.post('/change_password', userMiddleware.passwordProfile);

module.exports = router;
