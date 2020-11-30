
const express = require('express');

const app = express();
const winston = require('winston');

require('./startup/config')(app);
const { logger } = require('./startup/logging');
require('./startup/router')(app);
require('./startup/db')();
require('./startup/validation')();


const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));
module.exports = server;
