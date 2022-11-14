const {publishingController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const publishingValidate = require('../validations/publishing.validation')
const router = express.Router();


router.route('/')
.post(validate(publishingValidate.addPublisher), publishingController.addPublisher)
// .get(validate(provideValidate.getProvider),publishingController.getPublisherByID)

router.route('/:ID')
.put(validate(publishingValidate.updatePulisher), publishingController.updatePublisher)
.delete(validate(publishingValidate.deletePublisher), publishingController.deletePublisher)
.get(validate(publishingValidate.getPublisher),publishingController.getPublisherByID)

module.exports = router;