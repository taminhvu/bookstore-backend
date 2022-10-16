const express = require('express');
const {userController} = require('../controllers');
const ROLES_LIST = require('../config/roles.list');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT');
const router = express.Router();

router.use(verifyJWT);

 router.route('/')
 .post(verifyRoles(ROLES_LIST.Admin),userController.createUser)
 .get(verifyRoles(ROLES_LIST.Admin), userController.getAllUser);

router.route('/:id')
.get(userController.getUser)
.delete(userController.deleteUser);

router.route('/page/:index')
.get(verifyRoles(ROLES_LIST.Admin),userController.getUserPagination);
module.exports = router;