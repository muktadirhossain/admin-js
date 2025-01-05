import path from 'path'
import AdminJS, { ComponentLoader } from 'adminjs'
import express from 'express'
import mongoose from 'mongoose'
import * as AdminJSMongoose from '@adminjs/mongoose'
import { expressAuthenticatedRouter } from './configs/setup.js'
import adminOptions from './configs/admin-options.js'
import 'dotenv/config'


const PORT = process.env.PORT || 5000;

const dashboardHandler = async (req, res) => {
    try {
        // Fetch data for your dashboard (e.g., from MongoDB)
        const userCount = await mongoose.model('User').countDocuments();
        const adminCount = await mongoose.model('User').countDocuments({ role: 'admin' });

        res.json({ message: 'Welcome to the Admin Dashboard', userCount, adminCount });
    } catch (error) {
        console.error('Error in dashboard handler:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
};

const componentLoader = new ComponentLoader();
const __dirname = path.resolve();
const Components = {
    Dashboard: componentLoader.add('Dashboard', path.join(__dirname, '/adminjs-components/dashboard.jsx')),
};

const start = async () => {
    const app = express();

    // Serve static files from the "public" folder
    const __dirname = path.resolve(); 
    app.use(express.static(path.join(__dirname, 'public'))); 


    // Adapter Code :
    AdminJS.registerAdapter({
        Resource: AdminJSMongoose.Resource,
        Database: AdminJSMongoose.Database,
    })
    // Connect to MongoDB::
    await mongoose.connect(process.env.MONGO_URI);


    // Create AdminJS instance::
    const admin = new AdminJS({
        ...adminOptions,
        dashboard: {
            component: Components.Dashboard,
            handler: dashboardHandler, // Assign the handler here
        },
    })
    admin.watch()

    const adminRouter = expressAuthenticatedRouter(admin)
    app.use(admin.options.rootPath, adminRouter)




    app.get('/', (req, res) => {
        res.send('Hello World!')
    });

    app.get('*', (req, res) => {
        res.send('404! This is an invalid URL.')
    })

    app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
}

start()