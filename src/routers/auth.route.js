const {authController} = require('../controllers');
const  authValidation = require('../validations/auth.validation');
const validate = require('../middlewares/validate')
const express = require('express');
const router = express.Router();
router.post('/register',validate(authValidation.register), authController.register)
router.post('/login',validate(authValidation.login),authController.login);
router.post('/send-verification-email',authController.sendVerificationEmail);
router.get('/verify-email',authController.verifyEmailToken); 
module.exports = router;

