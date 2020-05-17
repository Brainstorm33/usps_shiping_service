const Router = require('koa-router');

const router = new Router({
  prefix: '/api/v2/generate',
});


const rateShipping = require('../controllers/rate');
const createOrder = require('../controllers/createOrder');
const generateLabel = require('../controllers/label');
const buyAnOrder = require('../controllers/buyAnOrder');
const refundLabel = require('../controllers/refundLabel');
const retrieveShipping = require('../controllers/retrieveShipping');
const retrieveTracker = require('../controllers/retrieveTracker');
const validateAddress = require('../controllers/validateAddress');

router.post('/rateShipping', rateShipping); // rate shipping for an item
router.post('/createOrder', createOrder); // rate shipping for items
router.post('/generateLabel', generateLabel); // generate label for an item
router.post('/buyAnOrder', buyAnOrder); // generate label for items
router.post('/refundLabel', refundLabel);
router.post('/retrieveShipping', retrieveShipping);
router.post('/retrieveTracker', retrieveTracker);
router.post('/validateAddress', validateAddress);

module.exports = router;
