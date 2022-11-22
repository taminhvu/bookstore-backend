const {orderController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const orderValidate = require('../validations/order.validation')
const router = express.Router();

router.get('/pages',validate(orderValidate.getOrder),orderController.getOrderPagination);
router.get('/revanue',validate(orderValidate.getOrder),orderController.getRevanue);
router.get('/amountperday',validate(orderValidate.getOrder),orderController.getAmountPerDay);
router.get('/amount',validate(orderValidate.getOrder),orderController.getAmount)
router.route('/')
.post(validate(orderValidate.addOrder),orderController.addOrder)
.get(validate(orderValidate.getOrder),orderController.getAllOrder)

router.route('/:ID')
// .put(orderController)
// .delete(validate(provideValidate.deleteProvider), provideController.deleteProvider)
.get(validate(orderValidate.getOrder),orderController.getOrderByID);

router.route('/order_detail/:ID')
.get(validate(orderValidate.getOrder),orderController.getOrderDetailByIDOrder)
module.exports = router;