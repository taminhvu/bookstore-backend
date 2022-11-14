const {categoryController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const categoryValidate = require('../validations/category.validation');
const router = express.Router();


router.route('/')
.post(validate(categoryValidate.addCategory), categoryController.addCategory)
// .get(validate(provideValidate.getProvider),publishingController.getPublisherByID)

router.route('/:ID')
.put(validate(categoryValidate.updateCategory), categoryController.updateCategoryByID)
.delete(validate(categoryValidate.deleteCategory), categoryController.deleteCategoryByID)
.get(validate(categoryValidate.getCategory),categoryController.getCategoryByID)

module.exports = router;