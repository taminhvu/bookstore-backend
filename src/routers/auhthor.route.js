const {authorController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const authorValidate = require('../validations/author.validation');
const router = express.Router();


router.route('/')
.post(validate(authorValidate.addAuthor), authorController.addAuthor)
// .get(validate(provideValidate.getProvider),publishingController.getPublisherByID)

router.route('/:ID')
.put(validate(authorValidate.updateAuthor), authorController.updateAuthorByID)
.delete(validate(authorValidate.deleteAuthor), authorController.deleteAuthorByID)
.get(validate(authorValidate.getAuthor),authorController.getAuthorByID)

module.exports = router;