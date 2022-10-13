const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

 router.route('/')
 .post(userController.createUser)
 .get(userController.getAllUser);

router.route('/:id')
.get(userController.getUser)
.delete(userController.deleteUser);

module.exports = router;