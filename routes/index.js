const router = require('koa-router')();
const validateAddress = require('../controllers/validate');
const rateShipping = require('../controllers/rate');
const label = require('../controllers/label');


router.post('/validateAddress', /* Authenticate, */ validateAddress);

router.post('/rateShipping', /* Authenticate, */ rateShipping);

router.post('/label', /* Authenticate, */ label);


module.exports = router;
