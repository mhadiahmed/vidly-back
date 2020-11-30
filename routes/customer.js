const express = require('express');
const { Customer, validate } = require('../models/customer');
const router = express.Router();
const _ = require('lodash');


router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);
    const customer = new Customer(_.pick(req.body, ['name', 'phone', 'isGold']));
    await customer.save();
    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The course with the given ID was not found.');
    res.send(customer);
});


router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        _.pick(req.body, ['name', 'phone', 'isGold'])
        , { new: true });
    if (!customer) return res.status(404).send('The Customer with the given ID was not found.');

    res.send(customer);
});


router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});




module.exports = router;