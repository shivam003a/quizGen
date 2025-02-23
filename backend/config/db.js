import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {

    const MONGO_URL = process.env.MONGO_URL
    try {
        const connection = await mongoose.connect(MONGO_URL)
        console.log("MongoDB connected", connection?.connections[0]?.host)
    } catch (e) {
        console.log('Error connecting to MongoDB');
        process.exit(1);
    }
}

export default connectDB;