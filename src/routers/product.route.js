const {productController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const productValidate = require('../validations/product.validation')
const router = express.Router();


router.route('/')
.post(validate(productValidate.addProduct), productController.addProduct)
.get(validate(productValidate.getProduct),productController.getAllProduct)

router.route('/:ID')
.put(validate(productValidate.updateProduct), productController.updateProductByID)
.delete(validate(productValidate.deleteProduct), productController.deleteProductByID)
.get(validate(productValidate.getProduct),productController.getProductByID)

module.exports = router;