const mongoose = require('mongoose');

function connectToDb() {
    if (!process.env.DB_CONNECT) {
        console.error('DB_CONNECT environment variable is not set');
        process.exit(1);
    }

    mongoose.connect(process.env.DB_CONNECT)
        .then(() => {
            console.log('Connected to DB');
        })
        .catch(err => {
            console.error('Database connection error:', err.message);
            process.exit(1);
        });
}

module.exports = connectToDb;
