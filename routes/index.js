const router = require('koa-router')();
const rateShipping = require('../controllers/rate');
const generateLabel = require('../controllers/label');


router.post('/rateShipping', rateShipping);

router.post('/generateLabel', generateLabel);

module.exports = router;
