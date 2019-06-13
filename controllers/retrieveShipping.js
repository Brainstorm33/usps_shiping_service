const _ = require('lodash');
const router = require('koa-router')();
const Easypost = require('@easypost/api');


async function retrieveShipping(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);

  const data = _.get(ctx, 'request.body');
  const { shipmentId, shippingType } = data;

  try {
    const shipment = await api.Shipment.retrieve(shipmentId);
    let priorityRate;
    for (let i = 0; i < shipment.rates.length; i += 1) {
      if (shipment.rates[i].service === shippingType) {
        priorityRate = shipment.rates[i];
        break;
      }
    }
    // shipment.rates = [priorityRate];
    _.set(ctx, 'body', priorityRate);
  } catch (err) {
    console.log(JSON.stringify(err));
    const message = err.Description;
    throw new Error(message);
  }
}

router.post('/retrieveShipping', retrieveShipping);


module.exports = router.routes();

