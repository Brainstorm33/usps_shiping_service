// import Async from 'async';

const _ = require('lodash');
const router = require('koa-router')();
const Easypost = require('@easypost/api');
const fetch = require('node-fetch');

// const { USPS_KEY } = process.env;
// const api = new Easypost(USPS_KEY);


async function webHook(ctx) {
  const { USPS_KEY, BACKEND_SERVICE_URL } = process.env;
  const api = new Easypost(USPS_KEY);

  const data = _.get(ctx, 'request.body');
  console.log('uspsShippingWebHookDataShippingWebHookDataShippingWebHookData');
  console.log(data.result.id);
  console.log(data.result.status);
  // const { tracking_code } = data;

  try {
    // console.log('ccccccccccccccccccccccccccccccccccccccccccccc');
    // api.Webhook.all().then(console.log);
    // console.log('ccccccccccccccccccccccccccccccccccccccccccccc');


    // const webhook = new api.Webhook({ url: 'http://435ca619.ngrok.io/shipping/webHook' });

    // webhook.save().then(console.log);
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    // api.Webhook.retrieve('hook_1b93225e60db420da2fd021a100bf574').then(console.log);

    /* api.Webhook.retrieve('hook_1b93225e60db420da2fd021a100bf574').then((wh) => {
      wh.save().then(console.log);
    }); */


    /* const tracker = new api.Tracker({
      tracking_code,
      carrier: 'USPS',
    });

    const result = await tracker.save()
      .then()
      .catch();
    console.log('resultresultresultresultresultresultresultresult'); */
    // console.log(result);


    // api.Webhook.retrieve('hook_6f3e87efb975449fb02949a1bb579419').then(console.log);


    /* Async.forEach(response, (participant) => {
      let count = 1;
      console.log(count + count + count + count + count + count);
      console.log(participant);
      count += 1;
    }); */

    /*
    const trackers = await api.Tracker.all({
      page_size: 1, // 5
      start_datetime: '2019-03-10T08:50:00Z',
    })
      .then();

    console.log('responseresponseresponseresponseresponse');
    console.log(trackers);

    Object.keys(trackers).forEach(async (key) => {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      console.log(key, trackers[key].status);
      const { tracking_code } = trackers[key];
      console.log('tracking_codetracking_codetracking_codetracking_code');
      console.log(tracking_code);
      // if (trackers[key].status === 'delivered') {
      console.log('CONFIRM TRANSACTION');
      const resp = await fetch('http://localhost:3300/shipping/callConfirmTransaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barev: 'hey' }),
        // body: JSON.stringify(tracking_code),
      })
        .then(response => response.json())
        .catch((err) => { console.log(err); });
      console.log('77777resprespresprespresprespresprespresp');
      console.log(resp);
      _.set(ctx, 'body', resp);
      // } else if (trackers[key].status === 'return_to_sender') {
      //   console.log('REFUND');
      // }
      console.log('response[key]tracking_code.response[key]tracking_code');
      console.log(trackers[key].tracking_code);
    });
*/
    // trk.result.status
    /* const trk = {
      id: 'evt_qatAiJDM',
      object: 'Event',
      created_at: '2014-11-19T10:51:54Z',
      updated_at: '2014-11-19T10:51:54Z',
      description: 'tracker.updated',
      mode: 'test',
      previous_attributes: {
        status: 'unknown',
      },
      pending_urls: [],
      completed_urls: [],
      result: {
        id: 'trk_Txyy1vaM',
        object: 'Tracker',
        mode: 'test',
        tracking_code: '9461236897846021402239',
        status: 'delivered',
        created_at: '2014-11-18T10:51:54Z',
        updated_at: '2014-11-18T10:51:54Z',
        signed_by: 'John Tester',
        weight: 17.6,
        est_delivery_date: '2014-08-27T00:00:00Z',
        shipment_id: null,
        carrier: 'UPS',
        public_url: 'https://track.easypost.com/djE7...',
        tracking_details: [
          {
            object: 'TrackingDetail',
            message: 'BILLING INFORMATION RECEIVED',
            status: 'pre_transit',
            datetime: '2014-08-21T14:24:00Z',
            tracking_location: {
              object: 'TrackingLocation',
              city: null,
              state: null,
              country: null,
              zip: null,
            },
          }, {
            object: 'TrackingDetail',
            message: 'ORIGIN SCAN',
            status: 'in_transit',
            datetime: '2014-08-21T14:48:00Z',
            tracking_location: {
              object: 'TrackingLocation',
              city: 'SOUTH SAN FRANCISCO',
              state: 'CA',
              country: 'US',
              zip: null,
            },
          }, {
            object: 'TrackingDetail',
            message: 'DEPARTURE SCAN',
            status: 'in_transit',
            datetime: '2014-08-22T08:51:00Z',
            tracking_location: {
              object: 'TrackingLocation',
              city: 'SOUTH SAN FRANCISCO',
              state: 'CA',
              country: 'US',
              zip: null,
            },
          }, {
            object: 'TrackingDetail',
            message: 'ARRIVAL SCAN',
            status: 'in_transit',
            datetime: '2014-08-23T09:31:00Z',
            tracking_location: {
              object: 'TrackingLocation',
              city: 'SAN FRANCISCO',
              state: 'CA',
              country: 'US',
              zip: null,
            },
          }, {
            object: 'TrackingDetail',
            message: 'OUT FOR DELIVERY',
            status: 'out_for_delivery',
            datetime: '2014-08-24T08:10:00Z',
            tracking_location: {
              object: 'TrackingLocation',
              city: 'SAN FRANCISCO',
              state: 'CA',
              country: 'US',
              zip: null,
            },
          }, {
            object: 'TrackingDetail',
            message: 'DELIVERED',
            status: 'delivered',
            datetime: '2014-08-24T15:33:00Z',
            tracking_location: {
              object: 'TrackingLocation',
              city: 'SAN FRANCISCO',
              state: 'CA',
              country: 'US',
              zip: null,
            },
          },
        ],
      },
    }; */

    const { status: tracking_status, tracking_code } = data.result;
    if (tracking_status === 'delivered' /* && tracking_status !== conversation.status */) {
      console.log('delivered');
      const resp = await fetch(`${BACKEND_SERVICE_URL}/shipping/callConfirmTransaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tracking_status, tracking_code /* : '9461236897846021416731' */ }),
        // body: JSON.stringify(tracking_code),
      })
        .then(response => response.json())
        .catch((err) => { console.log(err); });
      _.set(ctx, 'body', resp);
    } else if (data.result.status === 'return_to_sender') {
      console.log('return_to_sender');
      const resp = await fetch(`${BACKEND_SERVICE_URL}/shipping/callRefundTransaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tracking_status, tracking_code /* : '9461236897846021416731' */ }),
        // body: JSON.stringify(tracking_code),
      })
        .then(response => response.json())
        .catch((err) => { console.log(err); });
      _.set(ctx, 'body', resp);
    }

    // _.set(ctx, 'body', 'barev');
  } catch (err) {
    console.log(err);
  }
}

router.post('/webHook', webHook);


module.exports = router.routes();

