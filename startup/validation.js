const Joi = require('Joi');

module.exports = function () {
    Joi.ObjectId = require('joi-objectid')(Joi);
}