const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get ('/', homeController.homeIndex);
router.get ('/chi-sono', homeController.chiSono);
router.get ('/lavoriamo-insieme', homeController.lavoriamoInsieme);
router.get ('/contattami', homeController.contattami);
router.get ('/cookie-policy', homeController.cookiePolicy);

router.post ('/invio-messaggio', homeController.invioModuloContatti);

module.exports = router;