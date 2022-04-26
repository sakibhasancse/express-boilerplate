import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const MONGO_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const MONGO_URI = process.env.MONGO_DB_URL;

const dbConnection = async (cb, em) => {
    try{
        const db = await mongoose.connect(MONGO_URI, MONGO_CONFIG);

        console.log(
            `Db connected, db name: ${db.connections[0].name}`
        );
        if (cb && em) cb(em);
    }catch (error) {
        console.log(
            `Failed db connection - ${error}`
        );
        process.exit(1)
    }

};
export default dbConnection;