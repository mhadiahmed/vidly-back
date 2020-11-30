const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { genreSchema } = require('./genres');

const Rental = mongoose.model('Rentals', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
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
        }),
        required: true,
    },

    movie: {
        type: mongoose.Schema({
            title: {
                type: String,
                required: true,
                minLength: 0,
                maxLength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

// <details open>
//   <summary>Parmesan Deviled Eggs</summary>
//   <p>
//     These delectable little bites are made with organic eggs, fresh Parmesan, and chopped pine nuts.
//   </p>
// </details>


function validateRental(genre) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    });

    return schema.validate(genre);
}

exports.validate = validateRental;
exports.Rental = Rental;