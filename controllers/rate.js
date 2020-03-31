const _ = require('lodash');
const router = require('koa-router')();
const Easypost = require('@easypost/api');


async function rateShipping(ctx) {
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
    itemData: {
      weight,
      length,
      width,
      height,
      predefinedPackage,
    },
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

    let parcel;
    if (predefinedPackage) {
      parcel = new api.Parcel({
        weight: parseInt(weight, 10),
        predefined_package: predefinedPackage,
      });
    } else {
      parcel = new api.Parcel({
        length: parseInt(length, 10),
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
      });
    }

    const shipment = new api.Shipment({
      parcel,
      to_address: toAddress,
      from_address: fromAddress,
    });

    await parcel.save();
    await shipment.save();


    if (shipment) {
      if (shipment.messages) {
        if (shipment.messages[0]) {
          if (shipment.messages[0].message) {
            const { message: errorMessage } = shipment.messages[0];
            throw new Error(errorMessage);
          }
        }
      }
    }

    _.set(ctx, 'body', shipment);
  } catch (err) {
    throw new Error(err);
  }
}

router.post('/rateShipping', rateShipping);


module.exports = router.routes();

