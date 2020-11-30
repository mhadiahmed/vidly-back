const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genres');

const Movies = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 0,
        maxLength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }

}));

function validateMovies(genre) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required().messages({
            'string.empty': 'Title is required and minimum of 5 characters.'
        }),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    return schema.validate(genre);
}

exports.validate = validateMovies;
exports.Movies = Movies;