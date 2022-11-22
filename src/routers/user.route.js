const express = require('express');
const {userController} = require('../controllers');
const ROLES_LIST = require('../config/roles.list');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const router = express.Router();

// router.use(verifyJWT);
router.get('/statisticperday',validate(userValidation.getInfor),userController.getNewRegistrationPerDay);
router.get('/statistic',validate(userValidation.getInfor),userController.getNewRegistration);

 router.route('/')
//  .post(verifyRoles(ROLES_LIST.Admin),userController.createUser)
 .get(verifyRoles(ROLES_LIST.Admin), userController.getAllUser)
 .put(validate(userValidation.changeInfo),userController.changeInfoUser);

router.route('/:id')
.get(validate(userValidation.getInfor),userController.getUser)
.delete(validate(userValidation.getInfor),userController.deleteUser);

router.route('/page/:index')
.get(verifyRoles(ROLES_LIST.Admin),validate(userValidation.getInfor),userController.getUserPagination);

//sua lai khi ghep code
router.post('/avatar',userController.updateAvatar);


module.exports = router; 