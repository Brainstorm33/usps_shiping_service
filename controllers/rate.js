const _ = require('lodash');
const router = require('koa-router')();
const Easypost = require('@easypost/api');


async function rateShipping(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);

  console.log('USPS_KEY_USPS_KEY_USPS_KEY_USPS_KEY_USPS_KEY_USPS_KEY_USPS_KEY_USPS_KEY_USPS_KEY');
  console.log(USPS_KEY);
  const data = _.get(ctx, 'request.body');

  const {
    toStreet1,
    toStreet2,
    toCity,
    toState,
    toZip,
    toCountry,
    toCompany,
    toPhone,

    fromStreet1,
    fromStreet2,
    fromCity,
    fromState,
    fromZip,
    fromCountry,
    fromCompany,
    fromPhone,

    length,
    width,
    height,
    weight,
  } = data;

  try {
    /* Either objects or ids can be passed in. If the object does
     * not have an id, it will be created. */
    const toAddress = new api.Address({
      street1: toStreet1,
      street2: toStreet2,
      city: toCity,
      state: toState,
      zip: toZip,
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

    // TODO parcel sizes should be changed
    const parcel = new api.Parcel({
      length: parseInt(length, 10),
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      weight: parseInt(weight, 10),
    });

    const shipment = new api.Shipment({
      parcel,
      to_address: toAddress,
      from_address: fromAddress,
      is_return: true,
    });

    try {
      parcel.save()
        .then(console.log)
        .catch(console.log);
    } catch (error) {
      console.log(error);
    }

    await shipment.save();


    _.set(ctx, 'body', shipment);
  } catch (err) {
    console.log(err);
  }
}

router.post('/rateShipping', rateShipping);


module.exports = router.routes();

