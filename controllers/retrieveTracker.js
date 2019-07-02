const _ = require('lodash');
const router = require('koa-router')();
const Easypost = require('@easypost/api');


async function retrieveTracker(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);

  const data = _.get(ctx, 'request.body');
  const { trackerId } = data;

  try {
    const tracker = await api.Tracker.retrieve(trackerId);

    _.set(ctx, 'body', tracker);
  } catch (err) {
    console.log(JSON.stringify(err));
    const message = err.Description;
    throw new Error(message);
  }
}

router.post('/retrieveTracker', retrieveTracker);


module.exports = router.routes();

