const mongoose = require('mongoose');
const Joi = require('joi');
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateCourse(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required().messages({
            'string.empty': 'Name is required and minimum 3 characters.'
        })
    });

    return schema.validate(genre);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateCourse;