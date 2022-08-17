const mongoose = require('mongoose')
require('dotenv').config()

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/primeraBaseDatos');
        console.log('Base de datos conectada')
    } catch (error) {
        console.log(error)
    }
};

module.exports = { connectMongo };
