const {orderController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const orderValidate = require('../validations/order.validation')
const router = express.Router();


router.route('/')
.post(validate(orderValidate.addOrder),orderController.addOrder)
// .get(validate(provideValidate.getProvider),provideController.getProvider)

// router.route('/:ID')
// .put(validate(provideValidate.updateProvider), provideController.updateProvider)
// .delete(validate(provideValidate.deleteProvider), provideController.deleteProvider)
// .get(validate(provideValidate.getProvider),provideController.getProviderByID)

module.exports = router;