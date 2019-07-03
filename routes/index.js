const router = require('koa-router')();
const rateShipping = require('../controllers/rate');
const generateLabel = require('../controllers/label');
const refundLabel = require('../controllers/refundLabel');
const retrieveShipping = require('../controllers/retrieveShipping');
const retrieveTracker = require('../controllers/retrieveTracker');


router.post('/rateShipping', rateShipping);

router.post('/generateLabel', generateLabel);

router.post('/refundLabel', refundLabel);

router.post('/retrieveShipping', retrieveShipping);

router.post('/retrieveTracker', retrieveTracker);

module.exports = router;
