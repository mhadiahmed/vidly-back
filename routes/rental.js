const { Rental, validate } = require('../models/rental');
const { Movies } = require('../models/movies');
const { Customer } = require('../models/customer');
const _ = require('lodash');
const Fawn = require('fawn');;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('invalid customer');
    const movie = await Movies.findById(req.body.movieId);
    if (!movie) return res.status(400).send('invalid movie');

    if (movie.numberInStock == 0) return res.status(400).send('Movie not in stock')

    let rental = new Rental({
        customer: _.pick(customer, ['_id', 'name', 'phone']),
        movie: _.pick(movie, ['_id', 'title', 'dailyRentalRate'])
    });
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
            .run();

        res.send(rental);
    } catch (err) {
        res.status(500).send('Somthing failed');
    }
});


module.exports = router;
