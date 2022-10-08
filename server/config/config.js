const mongoose = require('mongoose')

const dbName = "mongodb://localhost:27017";

const connectDB = () => {
    try {
        mongoose.connect(dbName, {
            dbName: 'Messages',
            useNewUrlParser: true
        });

        console.log('MongoDB is connected');
    } catch(err) {
        console.log(err.message);
        
    }
};

module.exports = connectDB;