const _ = require('lodash');
const router = require('koa-router')();
const usps = require('usps-web-tools-node-sdk');
// const bluebird = require('bluebird');
// const xmlParser = require('xml2json');


async function label(ctx) {
  const data = _.get(ctx, 'request.body');
  const {
    Option,
    CustomerName,
    CustomerAddress1,
    CustomerAddress2,
    CustomerCity,
    CustomerState,
    CustomerZip5,
    RetailerName,
    RetailerAddress,
    PermitNumber,
    PermitIssuingPOCity,
    PermitIssuingPOState,
    PermitIssuingPOZip5,
    PDUFirmName,
    PDUPOBox,
    PDUCity,
    PDUState,
    PDUZip5,
    PDUZip4,
    ServiceType,
    DeliveryConfirmation,
    MailingAckPackageID,
    WeightInPounds,
    WeightInOunces,
    RMA,
    RMAPICFlag,
    ImageType,
    RMABarcode,
  } = data;


  try {
    usps.configure({
      userID: process.env.USPS_USER_ID,
      server: process.env.USPS_SERVER_LABEL,
    });
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
      <RateV4Request USERID="${process.env.USPS_USER_ID}">
        <Option>${Option}</Option>
        <CustomerName>${CustomerName}</CustomerName>
        <CustomerAddress1>${CustomerAddress1}</CustomerAddress1>
        <CustomerAddress2>${CustomerAddress2}</CustomerAddress2>
        <CustomerCity>${CustomerCity}</CustomerCity>
        <CustomerState>${CustomerState}</CustomerState>
        <CustomerZip5>${CustomerZip5}</CustomerZip5>
        <RetailerName>${RetailerName}</RetailerName>
        <RetailerAddress>${RetailerAddress}</RetailerAddress>
        <PermitNumber>${PermitNumber}</PermitNumber>
        <PermitIssuingPOCity>${PermitIssuingPOCity}</PermitIssuingPOCity>
        <PermitIssuingPOState>${PermitIssuingPOState}</PermitIssuingPOState>
        <PermitIssuingPOZip5>${PermitIssuingPOZip5}</PermitIssuingPOZip5>
        <PDUFirmName>${PDUFirmName}</PDUFirmName>
        <PDUPOBox>${PDUPOBox}</PDUPOBox>
        <PDUCity>${PDUCity}</PDUCity>
        <PDUState>${PDUState}</PDUState>
        <PDUZip5>${PDUZip5}</PDUZip5>
        <PDUZip4>${PDUZip4}</PDUZip4>
        <ServiceType>${ServiceType}</ServiceType>
        <DeliveryConfirmation>${DeliveryConfirmation}</DeliveryConfirmation>
        <MailingAckPackageID>${MailingAckPackageID}</MailingAckPackageID>
        <WeightInPounds>${WeightInPounds}</WeightInPounds>
        <WeightInOunces>${WeightInOunces}</WeightInOunces>
        <RMA>${RMA}</RMA>
        <RMAPICFlag>${RMAPICFlag}</RMAPICFlag>
        <ImageType>${ImageType}</ImageType>
        <RMABarcode>${RMABarcode}</RMABarcode>
      </RateV4Request>`;
    // console.log('JSON output ================> ', xmlParser.toJson(xmlString));
    // const data = xmlParser.toJson(xmlString);

    // const shipping = bluebird.promisifyAll(usps);
    const result = usps.customFormLabel.customs({ xmlString },
      // and a callback
      (error, response) => {
        if (error) {
          // if there's a problem, the error object won't be null
          console.log(error);
        } else {
          // otherwise, you'll get a response object
          console.log(JSON.stringify(response));
        }
      },
    );

    // _.set(ctx, 'body', 'fswfe');
    ctx.body = {
      success: true,
      data: result,
      message: {
        code: 200,
        debug: 'Request processed succesfully',
        display: 'Request processed succesfully',
      },
    };
  } catch (err) {
    const message = err.Description;
    const error = new Error(message);
    error.display = message;
    error.debug = message;
    throw error;
    /* ctx.body = {
      success: false,
      message: {
        code: 500,
        debug: error.Description,
        display: error.Description,
      },
    }; */
  }
}

router.post('/label', label);


module.exports = router.routes();
