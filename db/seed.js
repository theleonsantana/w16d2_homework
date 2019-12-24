const Lorem = require('../models/lorem.js');
const data = require('./seeds.json');
const mongoose = require('./connection/js');

mongoose.connection.once('open', () => {
    console.log('connected to mongo')
});

Lorem.deleteMany({})
    .then(() => {
        return Lorem.collection.insertMany(data);
    })
    .then(() => {
        process.exit();
    });

//BASH COMMAND: "npm run seed" WHEN READY TO SEED DATA