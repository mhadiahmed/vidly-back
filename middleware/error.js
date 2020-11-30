
const { logger } = require('../startup/logging');
module.exports = function (err, req, res, next) {
    logger.error(err.message, err);
    res.status(500).send("Somthing Failed.");
};

// process.on('uncaughtException', (ex) => {
//     winston.error(ex.message, ex);
//     process.exit(1);
// });