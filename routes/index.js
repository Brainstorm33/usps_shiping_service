const router = require('koa-router')();
const rateShipping = require('../controllers/rate');
const generateLabel = require('../controllers/label');
const refundLabel = require('../controllers/refundLabel');
const retrieveShipping = require('../controllers/retrieveShipping');


router.post('/rateShipping', rateShipping);

router.post('/generateLabel', generateLabel);

router.post('/refundLabel', refundLabel);

router.post('/retrieveShipping', retrieveShipping);

module.exports = router;
