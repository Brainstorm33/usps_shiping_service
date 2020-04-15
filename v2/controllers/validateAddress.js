const _ = require('lodash');
const router = require('koa-router')();
const Easypost = require('@easypost/api');

async function validateAddress(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);

  const data = _.get(ctx, 'request.body');

  const {
    verify,
    street1,
    street2,
    city,
    state,
    zip,
    country,
    company,
    phone,
  } = data;

  try {
    const verifiableAddress = new api.Address({
      verify,
      street1,
      street2,
      city,
      state,
      zip,
      country,
      company,
      phone,
    });

    const result = await verifiableAddress.save();


    _.set(ctx, 'body', { verifications: result.verifications });
  } catch (err) {
    const message = err.Description;
    throw new Error(message);
  }
}

router.post('/api/v2/generate/validateAddress', validateAddress);


module.exports = router.routes();

