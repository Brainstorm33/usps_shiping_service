const _ = require('lodash');
const router = require('koa-router')();

const Easypost = require('@easypost/api');

// TODO test
async function buyAnOrder(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);
  const data = _.get(ctx, 'request.body');

  const { orderId, serviceName } = data;

  try {
    // api.Order.retrieve('order_...').then(order => {
    //   order.buy('FedEx', 'FEDEX_GROUND').catch(console.error)
  // });
    console.log('=== 123 === ', orderId);
    const order = await api.Order.retrieve(orderId);
    // const shipping = await api.Shipment.retrieve(shipmentId);

    console.log('=== buyAnOrder ===');
    console.log(order);

    const rate = serviceName;

    // if (serviceName) {
    //   rate = order.rates.find(el => el.service === serviceName);
    // }
    const result = await order.buy('FedEx', rate || order.lowestRate()); // FEDEX_GROUND

    // const { tracker: { public_url: trackingUrl } } = result;

    // for (let i = 0; i < result.shipments.length; i++) {
    //   const {
    //     tracker: { public_url: trackingUrl },
    //     postage_label: { label_url: labelUrl },
    //   } = result;
    //   console.log('trackingUrl ===>  ', trackingUrl);
    //   console.log('labelUrl ===>  ', labelUrl);
    // }

    _.set(ctx, 'body', { result });
    // _.set(ctx, 'body', { result, trackingUrl });
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

router.post('/api/v2/generate/buyAnOrder', buyAnOrder);


module.exports = router.routes();
