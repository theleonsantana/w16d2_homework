const express = require('express');
const router = express.Router();
const Lorems = require('../models/lorem.js');

//READ
router.get('/', (req, res) => {
    Lorems.find({}, (err, foundLorems) => {
        res.json(foundLorems);
    });
});

//CREATE
router.post('/', (req, res) => {
    Lorems.create(req.body, (err, createdLorem) => {
        res.json(createdLorem);
    });
});

//UPDATE
router.put('/:id', (req, res) => {
    Lorems.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedLorem) => {
        res.json(updatedLorem);
    });
});

//DELETE
router.delete('/:id', (req, res) => {
    Lorems.findByIdAndRemove(req.params.id, (err, deletedLorem) => {
        res.json(deletedLorem);
    });
});

module.exports = router;