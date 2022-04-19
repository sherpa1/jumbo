const mongoose = require("mongoose");

(async () => {

    try {

        await mongoose.connect(`mongodb://${process.env.MONGO_DB_HOST}:27017`, {
            user: process.env.MONGO_DB_USERNAME,
            pass: process.env.MONGO_DB_PASSWORD,
            dbName: process.env.MONGO_DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Connection to ${process.env.MONGO_DB_NAME}`);

    } catch (error) {
        throw error;
    }

})();


module.exports = mongoose;
