import moongoose from 'mongoose';
import { config } from './config';

const connectDB = async () => {
    try {
       await moongoose.connect(config.mongo_uri as string);
    console.log("MongoDB connect successfully");
    } catch (error) {
        console.log("Error connect database", error);
        process.exit(1);
    }
}

export default connectDB