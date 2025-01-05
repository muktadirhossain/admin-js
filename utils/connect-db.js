import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('MongoDB connected 🚀🚀🚀');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;