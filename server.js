//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;

//ENVIRONMENT VARIABLES
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/merncrud'
const PORT = process.env.PORT || 3000;

//CONNECT TO MONGO
mongoose.connect(mongoURI, {useNewURLParser: true},
    () => console.log('MongoDB connection established:', mongoURI)
)

//ERROR/DISCONNECTION
db.on('error', err => console.log(err.message + 'is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

//ROUTES
const loremController = require('./controllers/lorem.js');
app.use('/lorem', loremController);

app.get('*', (req, res) => {
    res.status(404).json('Sorry, page not found')
})

app.listen(PORT, () => {
    console.log('Let\'s get things done on port', PORT)
})