const router = require('koa-router')();
const rateShipping = require('../controllers/rate');
const generateLabel = require('../controllers/label');
const webHook = require('../controllers/webhook');


router.post('/rateShipping', rateShipping);

router.post('/generateLabel', generateLabel);

router.post('/webHook', webHook);


module.exports = router;
