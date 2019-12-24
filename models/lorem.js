const mongoose = require('mongoose');

const loremSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        data: String
    }
)

const Lorems = mongoose.model('Lorem', loremSchema);

module.exports = Lorems;