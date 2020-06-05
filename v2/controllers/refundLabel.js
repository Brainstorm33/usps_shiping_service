const _ = require('lodash');
const router = require('koa-router')();

const Easypost = require('@easypost/api');

// const api = new Easypost('<YOUR_TEST/PRODUCTION_API_KEY>');


async function refundLabel(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);
  const data = _.get(ctx, 'request.body');
  console.log(data);
  const { shipmentId } = data;

  try {
    // https://www.easypost.com/docs/api/node#refunds

    const label = await api.Shipment.retrieve(shipmentId);

    // console.log('something ============> ', label);
    const labelRefund = await label.refund();

    // console.log('refundedLabel ============> ', labelRefund);

    _.set(ctx, 'body', labelRefund);
  } catch (err) {
    console.log('USPS------REFUND------LABEL-----ERROR');
    console.log(err);
    const message = err.Description;
    const error = new Error(message);
    error.display = message;
    error.debug = message;
    throw error;
  }
}

router.post('/api/v2/generate/refundLabel', refundLabel);


module.exports = router.routes();
