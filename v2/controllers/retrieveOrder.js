const _ = require('lodash');
const router = require('koa-router')();
const Easypost = require('@easypost/api');


async function retrieveOrder(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);

  const data = _.get(ctx, 'request.body');
  const { orderId, serviceName } = data;

  try {
    let shipment = await api.Order.retrieve(orderId);

    let rate;
    if (serviceName) {
      rate = shipment.rates.find(el => el.service === serviceName);

      shipment = {
        selected_rate: rate,
        ...shipment,
      };
    }

    _.set(ctx, 'body', shipment);
  } catch (err) {
    console.log(JSON.stringify(err));
    const message = err.Description;
    throw new Error(message);
  }
}

router.post('/api/v2/generate/retrieveOrder', retrieveOrder);


module.exports = router.routes();

