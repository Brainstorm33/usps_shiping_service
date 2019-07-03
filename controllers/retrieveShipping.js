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

    // let i = 0;

    // const indexOfUnusedRates = [];
    let priorityRate;
    for (let i = 0; i < shipment.rates.length; i += 1) {
      if (shipment.rates[i].service === shippingType) {
        // shipment.rates.service = [shipment.rates[i].service];
        priorityRate = shipment.rates[i];
        break;
      }
    }

    /* shipment.rates.forEach((rate) => {
      if (rate.service !== 'Priority') {
        indexOfUnusedRates.push(i);
      }
      i += 1;
    }); */

    // shipment.rates.splice(indexOfUnusedRates, 1);

    /* i = 0;
    indexOfUnusedRates.forEach((index) => {
      if (i === 0) {
        shipment.rates.splice(index, 1);
      } else {
        shipment.rates.splice(index - 1, 1);
      }
      i += 1;
    });


    const { rates: { 0: shippingPrice } } = shipment; */

    _.set(ctx, 'body', priorityRate);
  } catch (err) {
    console.log(JSON.stringify(err));
    const message = err.Description;
    throw new Error(message);
  }
}

router.post('/retrieveShipping', retrieveShipping);


module.exports = router.routes();

