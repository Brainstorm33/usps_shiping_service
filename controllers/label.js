const _ = require('lodash');
const router = require('koa-router')();

const Easypost = require('@easypost/api');


async function generateLabel(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);
  const data = _.get(ctx, 'request.body');
  console.log(data);
  const { shipment_id, rate: rateId } = data;

  // TODO fetch rate and pass to shipping.buy
  try {
    const shipping = await api.Shipment.retrieve(shipment_id);
    let rate;

    if (rateId) {
      rate = shipping.rates.find(el => el.id === rateId);
    }
    const result = await shipping.buy(rate || shipping.lowestRate());

    const { tracker: { public_url: trackingUrl } } = result;

    _.set(ctx, 'body', { result, trackingUrl });
  } catch (err) {
    console.log('USPS------GENERATE------LABEL-----ERROR');
    console.log(err);
    const message = err.Description;
    const error = new Error(message);
    error.display = message;
    error.debug = message;
    throw error;
  }
}

router.post('/generateLabel', generateLabel);


module.exports = router.routes();
