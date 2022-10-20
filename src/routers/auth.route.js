const {authController} = require('../controllers');
const  authValidation = require('../validations/auth.validation');
const validate = require('../middlewares/validate')
const express = require('express');
const verifyJWT = require('../middlewares/verifyJWT');

const router = express.Router();
router.post('/register',validate(authValidation.register), authController.register)
router.post('/login',validate(authValidation.login),authController.login);
router.post('/send-verification-email',validate(authValidation.sendVerificationEmail),authController.sendVerificationEmail);
router.post('/verify-email',validate(authValidation.verifyEmailToken),authController.verifyEmailToken); 
router.get('/refreshToken',validate(authValidation.refreshToken),authController.updateToken);
router.delete('/logout',validate(authValidation.logout),authController.logout);
router.post('/send-email-reset-password',validate(authValidation.sendEmailResetPassword), authController.sendEmailResetPassword);
router.post('/reset-password',validate(authValidation.resetPassword),authController.resetPassword);
router.put('/change_password',verifyJWT,validate(authValidation.changePassword),authController.changePassword);
module.exports = router;

