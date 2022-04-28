import mongoose from 'mongoose';

const MONGO_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const MONGO_URI = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/fileStorageApi';

const dbConnection = async () => {
    try{
         mongoose.connect(MONGO_URI, MONGO_CONFIG);

            // CONNECTION EVENTS
            // When successfully connected
        mongoose.connection.on('connected', function () {
            console.log('Mongoose default connection open to ' + MONGO_URI);
        });
        // If the connection throws an error
        mongoose.connection.on('error',function (err) {
            console.log('Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function() {
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
    }catch (error) {
        console.log(
            `Failed db connection - ${error}`
        );
        process.exit(1)
    }

};
export default dbConnection;