#!/usr/bin/env node
const envConfigs = require('dotenv');

const app = require('../app');
const pkg = require('../package.json');


envConfigs.config({ path: `${__dirname}/../.env` });

const PORT = 3001; // process.env.PORT || 3001;


app.listen(PORT);
console.log(`${pkg.name} v${pkg.version} listening on port ${PORT}`);

