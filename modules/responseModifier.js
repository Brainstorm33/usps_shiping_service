const _ = require('lodash');

const ResponseModifier = async (ctx, next) => {
  try {
    await next();
    if (ctx.type === 'text/html') return;
    const status = _.get(ctx, 'response.status');
    if (status < 200 || status >= 300) {
      ctx.status = status || 500;
      ctx.body = {
        success: false,
        message: {
          code: status || 500,
          debug: `Request could not be processed succesfully: ${_.get(ctx, 'response.message')}`,
          display: 'Request could not be processed succesfully',
        },
      };
    } else {
      const record = {
        success: true,
      };

      const data = _.get(ctx, 'response.body.data') || _.get(ctx, 'response.body');
      // const metaData = _.get(ctx, 'response.body.meta_data', {});

      // _.set(record, 'meta_data', metaData);
      // TODO hide this only for objects
      _.set(record, 'data', data);
      _.set(record, 'message', {
        code: 200,
        debug: 'Request processed succesfully',
        display: 'Request processed succesfully',
      });


      _.set(ctx, 'response.body', record);
    }
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      success: false,
      message: {
        code: error.code || 500,
        debug: error.debug || error.message,
        display: error.display || error.debug || error.message,
      },
    };
    ctx.app.emit('error', error, ctx);
  }
};

module.exports = ResponseModifier;
