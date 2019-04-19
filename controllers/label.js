const _ = require('lodash');
const router = require('koa-router')();

const Easypost = require('@easypost/api');


async function generateLabel(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);

  const data = _.get(ctx, 'request.body');
  const { shipment_id } = data;


  try {
    const shipping = await api.Shipment.retrieve(shipment_id);
    const result = await shipping.buy(shipping.lowestRate());

    _.set(ctx, 'body', result);
  } catch (err) {
    const message = err.Description;
    const error = new Error(message);
    error.display = message;
    error.debug = message;
    throw error;
  }
}

router.post('/generateLabel', generateLabel);


module.exports = router.routes();
