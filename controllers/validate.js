const _ = require('lodash');
const router = require('koa-router')();
const USPS = require('usps-webtools');
const bluebird = require('bluebird');


async function validateAddress(ctx) {
  const data = _.get(ctx, 'request.body');
  const {
    street1, street2, city, state, zip,
  } = data;

  try {
    const uspsShipping = new USPS({
      server: process.env.USPS_SERVER,
      userId: process.env.USPS_USER_ID,
      ttl: 10000, // TTL in milliseconds for request
    });

    const shipping = bluebird.promisifyAll(uspsShipping);

    const result = await shipping.verifyAsync({
      street1,
      street2,
      city,
      state,
      zip,
    });

    _.set(ctx, 'body', result);
  } catch (err) {
    const message = err.Description;
    const error = new Error(message);
    error.display = message;
    error.debug = message;
    throw error;
  }
}


router.post('/validateAddress', validateAddress);


module.exports = router.routes();
