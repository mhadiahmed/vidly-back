const mongoose = require('mongoose');
const Joi = require('joi');

const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
        unique: true
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.jwtPrivatekey);
    return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required().messages({
            'string.empty': 'Name is required and minimum 3 characters.'
        }),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;