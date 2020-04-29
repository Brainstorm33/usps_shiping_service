const _ = require('lodash');
const router = require('koa-router')();
const Easypost = require('@easypost/api');


async function retrieveShipping(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);

  const data = _.get(ctx, 'request.body');
  const { shipmentId, rateId } = data;

  try {
    const shipment = await api.Shipment.retrieve(shipmentId);

    let rate;
    if (rateId) {
      rate = shipment.rates.find(el => el.id === rateId);
      shipment.selected_rate = rate;
    }

    _.set(ctx, 'body', shipment);
  } catch (err) {
    console.log(JSON.stringify(err));
    const message = err.Description;
    throw new Error(message);
  }
}

router.post('/api/v2/generate/retrieveShipping', retrieveShipping);


module.exports = router.routes();

