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
    const order = await api.Order.retrieve(orderId);

    const rate = serviceName;

    const result = await order.buy('FedEx', rate || 'FEDEX_GROUND'); // TODO by default choose one of ratings


    _.set(ctx, 'body', { result });
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
