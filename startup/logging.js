const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');


const Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.Console({ handleExceptions: true }),
        new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'log/combined.log' }),
        new winston.transports.MongoDB({
            db: "mongodb://localhost/vidly",
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            level: 'info',
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'log/exceptions.log' })
    ]
});

module.exports.logger = Logger;
