const mongoose = require('mongoose');
const databaseName = 'healthcare_api';
mongoose.connect('mongodb://127.0.0.1:27017/' + databaseName, //databasename
    {
        useNewUrlParser: true,
        useCreateIndex: true
    })