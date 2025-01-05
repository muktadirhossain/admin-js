import connectDb from '../utils/connect-db.js'
import { User } from '../models/user.model.js'


const seedAdmin = async () => {
    try {
        await connectDb()
        const user = new User({
            name: "Muktadir Hossain",
            email: "muktadirhossainrabbi@gmail.com",
            password: "123456",
            isAdmin: true,
            role: "superadmin"

        })
        await user.save()
        console.log("Admin Created")
    } catch (error) {
        console.error(error);
        process.exit(1);

    }
}
seedAdmin()