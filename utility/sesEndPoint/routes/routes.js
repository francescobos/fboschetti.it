const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.post ('/sesFeedback', controller.sesFeedback);
router.post ('/sesConfirmation', controller.sesConfirmation);

module.exports = router;