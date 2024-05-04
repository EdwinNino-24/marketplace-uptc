const express = require('express');
const registerMiddleware = require('../middlewares/registerMiddleware');

const router = express.Router();

router.post('/register', registerMiddleware.register);
router.post('/code_activation', registerMiddleware.activateAccount);
router.post('/resend_code_activation', registerMiddleware.resendCode);

module.exports = router;
