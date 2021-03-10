const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then(() => console.log('Connected to database.'));


module.exports = mongoose.connection;