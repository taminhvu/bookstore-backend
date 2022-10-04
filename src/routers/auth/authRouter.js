const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/auth/AuthController');

router.post('/signup',AuthController.signUp);
router.post('/login',AuthController.login);
router.post('/verify',AuthController.isLoggedIn);
router.post('/refreshtoken',AuthController.refreshToken);

module.exports = router;
