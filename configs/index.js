import connectMongo from 'connect-mongo';
import { User } from '../models/user.model.js';
import 'dotenv/config'


//* handle authentication : condition to check for correct login details
export const authenticate = async (email, password) => {
    if(email && password){
        const user = await User.findOne({ email })
        if(!user){
            return null
        }    
        const isPasswordMatch = await user.comparePassword(password)
        if (user && isPasswordMatch) {
            return Promise.resolve(user)
        }
    }

    return null
}


// Configure Session Store for MongoDB
const MongoStore = connectMongo;
export const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions', // Optional: Customize collection name
    ttl: 14 * 24 * 60 * 60, // Session expiration in seconds
});

sessionStore.on('error', (error) => {
    console.error(error);
})
