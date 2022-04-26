import mongoose from 'mongoose';

const MONGO_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const MONGO_URI = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/fileStorageApi';

const dbConnection = async () => {
    try{
        await mongoose.connect(MONGO_URI, MONGO_CONFIG);
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
            console.log(
                `Db connected, db name: ${db.connections[0].name}`
            );
        });

    }catch (error) {
        console.log(
            `Failed db connection - ${error}`
        );
        process.exit(1)
    }

};
export default dbConnection;