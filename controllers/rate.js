const _ = require('lodash');
const router = require('koa-router')();
const Easypost = require('@easypost/api');


async function rateShipping(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);

  const data = _.get(ctx, 'request.body');

  let length;
  let width;
  let height;
  let weight;
  let fromZip;
  let fromStreet1;
  let fromStreet2;
  let fromCity;
  let fromState;
  let fromCountry;
  let fromCompany;
  let fromPhone;

  console.log('PRODUCT');
  // TODO wtf, all product ????????
  if (data.product.shipment) {
    const shipment = data.product.shipment;

    length = shipment.length;
    width = shipment.width;
    height = shipment.height;
    weight = shipment.weight;
    fromZip = shipment.zip;
    fromStreet1 = shipment.street1;
    fromStreet2 = shipment.street2;
    fromCity = shipment.city;
    fromState = shipment.state;
    fromCountry = shipment.country;
    fromCompany = shipment.company;
    fromPhone = shipment.phone;
  }

  const {
    toStreet1,
    toStreet2,
    toCity,
    toState,
    toZip,
    toCountry,
    toCompany,
    toPhone,
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

    const parcel = new api.Parcel({
      length: parseInt(length, 10),
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      weight: parseInt(weight, 10),
    });

    console.log('USPS------RATE------SHIPPING-----TO');
    console.log(toAddress);
    console.log('USPS------RATE------SHIPPING-----FROM');
    console.log(fromAddress);
    const shipment = new api.Shipment({
      parcel,
      to_address: toAddress,
      from_address: fromAddress,
    });

    await parcel.save();
    await shipment.save();

    _.set(ctx, 'body', shipment);
  } catch (err) {
    console.log(JSON.stringify(err));
    const message = err.Description;
    throw new Error(message);
  }
}

router.post('/rateShipping', rateShipping);


module.exports = router.routes();

