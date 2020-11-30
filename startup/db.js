const winston = require('winston');
const mongoose = require('mongoose');
const { logger } = require('./logging');
let db;
module.exports = function () {
    if (process.env.NODE_ENV == "test") {
        db = "mongodb://localhost/vidly_test"
    } if (process.env.NODE_ENV == "development") {
        db = "mongodb://localhost/vidly"
    }
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
        .then(() => logger.info(`connected to ${db}`))
}