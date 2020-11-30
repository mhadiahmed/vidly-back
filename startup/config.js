
const morgan = require('morgan');
const { logger } = require('../startup/logging');
require('dotenv').config();
module.exports = function (app) {
    if (!process.env.jwtPrivatekey) {
        logger.error('FATAL ERROR: jwt key is not defined');
        throw new Error('FATAL ERROR: jwt key is not defined');
    }

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('tiny'));
        console.log('Morgan Enabled...');
    }

    // if (process.env.NODE_ENV !== 'production') {
    //     logger.add(new winston.transports.Console({
    //         format: winston.format.simple(),
    //     }));
    // }
}