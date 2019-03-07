const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const responseTime = require('koa-response-time');
const router = require('./routes');
const ResponseModifier = require('./modules/responseModifier');

const env = process.env.NODE_ENV || 'development';

const app = new Koa();
if (env !== 'test') {
  app.use(logger());
}
app.use(bodyParser());
app.use(responseTime());
app.use(ResponseModifier);
app.use(router.routes()).use(router.allowedMethods());


module.exports = app;
