const _ = require('lodash');
const router = require('koa-router')();
const Easypost = require('@easypost/api');


async function rateShipping(ctx) {
  const { USPS_KEY } = process.env;
  const api = new Easypost(USPS_KEY);

  const data = _.get(ctx, 'request.body');

  let weight;
  let length;
  let width;
  let height;
  let fromZip;
  let fromStreet1;
  let fromStreet2;
  let fromCity;
  let fromState;
  let fromCountry;
  let fromCompany;
  let fromPhone;
  let predefinedPackage;

  console.log('PRODUCT');
  // TODO wtf, all product ????????
  if (data.product.shipment) {
    const shipment = data.product.shipment;

    weight = shipment.weight;
    length = shipment.length;
    width = shipment.width;
    height = shipment.height;
    predefinedPackage = shipment.predefinedPackage;
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
    buyerFullName,
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
      name: `to ${buyerFullName}`,
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

    let priorityRate;
    for (let i = 0; i < shipment.rates.length; i++) {
      if (shipment.rates[i].service === 'Priority') {
        priorityRate = [shipment.rates[i]];
        break;
      }
    }

    shipment.rates = priorityRate;

    _.set(ctx, 'body', shipment);
  } catch (err) {
    console.log(JSON.stringify(err));
    const message = err.Description;
    throw new Error(message);
  }
}

router.post('/rateShipping', rateShipping);


module.exports = router.routes();

