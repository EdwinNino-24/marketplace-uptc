const express = require('express');

const recoveryMiddleware = require('../middlewares/recoveryMiddleware');

const router = express.Router();

router.post('/search_account_recover', recoveryMiddleware.searchAccountRecover);
router.post('/resend_code_recover', recoveryMiddleware.resendCode);
router.post('/recover_account', recoveryMiddleware.recoverAccount);
router.post('/enter_password_recover', recoveryMiddleware.resetPassword);


module.exports = router;
