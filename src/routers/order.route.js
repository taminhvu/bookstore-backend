const {orderController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const orderValidate = require('../validations/order.validation')
const router = express.Router();

router.get('/revanue',orderController.getRevanue);
router.get('/amountperday',orderController.getAmountPerDay);
router.get('/amount',orderController.getAmount)
router.route('/')
.post(validate(orderValidate.addOrder),orderController.addOrder)
.get(orderController.getAllOrder)

router.route('/:ID')
// .put(orderController)
// .delete(validate(provideValidate.deleteProvider), provideController.deleteProvider)
.get(orderController.getOrderByID);

router.route('/order_detail/:ID')
.get(orderController.getOrderDetailByIDOrder)
module.exports = router;