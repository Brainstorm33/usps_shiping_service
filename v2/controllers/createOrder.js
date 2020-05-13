const _ = require('lodash');
const router = require('koa-router')();
const Easypost = require('@easypost/api');


async function createOrder(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);

  const data = _.get(ctx, 'request.body');

  const {
    fromAddress: {
      zip: fromZip,
      street1: fromStreet1,
      street2: fromStreet2,
      city: fromCity,
      state: fromState,
      country: fromCountry,
      company: fromCompany,
      phone: fromPhone,
    },
    toAddress: {
      street1: toStreet1,
      street2: toStreet2,
      city: toCity,
      state: toState,
      zip: toZip,
      country: toCountry,
      company: toCompany,
      phone: toPhone,
    },
    predefinedPackage,
    itemsData,
    carrierAccounts,
  } = data;

  try {
    /* Either objects or ids can be passed in. If the object does
    * not have an id, it will be created. */
    const toAddress = new api.Address({
      street1: toStreet1,
      street2: toStreet2,
      city: toCity,
      state: toState,
      zip: toZip.toString(),
      country: toCountry,
      company: toCompany,
      phone: toPhone,
    });

    const fromAddress = new api.Address({
      street1: fromStreet1,
      street2: fromStreet2,
      city: fromCity,
      state: fromState,
      zip: fromZip,
      country: fromCountry,
      company: fromCompany,
      phone: fromPhone,
    });


    const shipments = [];
    for (let i = 0; i < itemsData.length; i++) { // eslint-disable-line
      let shipment;
      if (predefinedPackage) {
        shipment = new api.Shipment({
          parcel: {
            predefined_package: predefinedPackage,
            weight: itemsData[i].weight,
          },
        });
      } else {
        shipment = new api.Shipment({
          parcel: {
            length: itemsData[i].length,
            width: itemsData[i].width,
            height: itemsData[i].height,
            weight: itemsData[i].weight,
          },
        });
      }

      shipments.push(shipment);
    }

    const order = new api.Order({
      to_address: toAddress,
      from_address: fromAddress,
      shipments,
      carrier_accounts: carrierAccounts,
    });

    await order.save();


    if (order) {
      if (order.messages) {
        if (order.messages[0]) {
          if (order.messages[0].message) {
            const { message: errorMessage } = order.messages[0];
            throw new Error(errorMessage);
          }
        }
      }
    }

    _.set(ctx, 'body', order);
  } catch (err) {
    throw new Error(err);
  }
}

router.post('/api/v2/generate/createOrder', createOrder);


module.exports = router.routes();
