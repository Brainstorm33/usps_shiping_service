const _ = require('lodash');
const router = require('koa-router')();

const Easypost = require('@easypost/api');


async function generateLabel(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);

  const data = _.get(ctx, 'request.body');
  const { shipment_id: shipmentId } = data;

  console.log('qwertyqwertyqwertyqwertyqwertyqwerty');
  try {
    const shipping = await api.Shipment.retrieve(shipmentId);
    const result = await shipping.buy(shipping.lowestRate());

    console.log('result.rates.tracking_code');
    console.log(result.rates.tracking_code);

    /* const tracker = new api.Tracker({
      tracking_code: result.rates.tracking_code,
      carrier: 'USPS',
    });

    tracker.save().then(console.log); */

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
