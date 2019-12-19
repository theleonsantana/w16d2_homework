const mongoose = require('mongoose');

const loremSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        length: { type: Number, min: 1, max: 500 }
    }
)

const Lorems = mongoose.model('Lorem', loremSchema);

module.exports = Lorems;