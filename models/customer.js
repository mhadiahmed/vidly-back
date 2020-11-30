const Joi = require('joi');
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    isGold: {
        type: Boolean,
        default: false

    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    }
}));


function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required().messages({
            'string.empty': 'Name is required and minimum 3 characters.'
        }),
        phone: Joi.string().min(3).max(50).required().messages({
            'string.empty': 'Phone is required and minimum 3 Number.'
        }),
        isGold: Joi.boolean()
    });

    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;