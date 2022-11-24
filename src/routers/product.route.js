const {productController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const productValidate = require('../validations/product.validation');
const router = express.Router();

// router.get('/id_theloai',validate(productValidate.getProduct),productController.getProductByIDTheLoai);
// router.get('/id_danhmuc',validate(productValidate.getProduct),productController.getProductByIDDanhMuc);
router.get('/filter',validate(productValidate.filter),productController.filter);
router.get('/pages',validate(productValidate.getProduct),productController.getProductPagination);
router.route('/new').get(validate(productValidate.getProduct),productController.getNewProduct);
router.route('/bestseller').get(validate(productValidate.getProduct),productController.getBestSeller);
router.route('/toptenbestsellerperday').get(validate(productValidate.getProduct),productController.getTopTenBestsellerPerDay);
router.route('/')
//validate(productValidate.addProduct),
.post(productController.addProduct)
.get(validate(productValidate.getProduct),productController.getAllProduct);

router.route('/:ID')
.put(validate(productValidate.updateProduct), productController.updateProductByID)
.delete(validate(productValidate.deleteProduct), productController.deleteProductByID)
.get(validate(productValidate.getProduct),productController.getProductByID)




router.get('/id_nhaxuatban/:ID',validate(productValidate.getProduct),productController.getProductByIDNhaXuatBan);


module.exports = router;