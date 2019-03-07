const _ = require('lodash');
const router = require('koa-router')();
const USPS = require('usps-webtools');
const bluebird = require('bluebird');


async function rateShipping(ctx) {
  const data = _.get(ctx, 'request.body');
  const {
    Service,
    ZipOrigination,
    ZipDestination,
    Pounds,
    Ounces,
    Width,
    Container,
    Size,
    Length,
    Height,
    Girth,
    Machinable,
  } = data;

  try {
    const uspsShipping = new USPS({
      server: process.env.USPS_SERVER,
      userId: process.env.USPS_USER_ID,
      ttl: 10000, // TTL in milliseconds for request
    });

    const pricingRate = {
      Service,
      ZipOrigination,
      ZipDestination,
      Pounds,
      Ounces,
      Container,
      Size,
      Width,
      Length,
      Height,
      Girth,
      Machinable,
    };
    const shipping = bluebird.promisifyAll(uspsShipping);
    const result = await shipping.pricingRateV4Async(
      pricingRate,
    );

    _.set(ctx, 'body', result);
  } catch (err) {
    const message = err.Description;
    const error = new Error(message);
    error.display = message;
    error.debug = message;
    throw error;
  }
}

router.post('/rateShipping', rateShipping);


module.exports = router.routes();

