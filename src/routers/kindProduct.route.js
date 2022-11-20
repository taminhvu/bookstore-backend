const {kindProductController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const kindProductValidate = require('../validations/kindProduct.validation');
const router = express.Router();


router.route('/')
.post(validate(kindProductValidate.addKindProduct), kindProductController.addKindProduct)
// .get(validate(provideValidate.getProvider),publishingController.getPublisherByID)

router.route('/:ID')
.put(validate(kindProductValidate.updateKindProduct), kindProductController.updateKindProductByID)
.delete(validate(kindProductValidate.deleteKindProduct), kindProductController.deleteKindProductByID)
.get(validate(kindProductValidate.getKindProduct),kindProductController.getKindProductByID)

router.route('/idcategory/:ID')
.get(validate(kindProductValidate.getKindProduct),kindProductController.getKindProudctByIDCategory)

module.exports = router;