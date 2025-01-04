import path from 'path'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import mongoose from 'mongoose'
import * as AdminJSMongoose from '@adminjs/mongoose'
import { Category } from './models/category.model.js'
import { User } from './models/user.model.js'
import 'dotenv/config'

const PORT = process.env.PORT || 5000;

const start = async () => {
    const app = express()


    //   Addtapter Code :
    AdminJS.registerAdapter({
        Resource: AdminJSMongoose.Resource,
        Database: AdminJSMongoose.Database,
    })
    await mongoose.connect(process.env.MONGO_URI)
    const adminOptions = {
        // We pass Category to `resources`
        resources: [
            {
                resource: Category,
                options: {
                    listProperties: ['_id', 'title'],
                    properties :{
                        title:{
                            id: "Category Name"
                        },
                        createdAt: { isVisible: { list: false, show: true, edit: false, filter: true } },
                        updatedAt: { isVisible: { list: false, show: true, edit: false, filter: false } },
                    }
                },
            },
            {
                resource: User,
                
                options: {
                    id: "users",
                    icon: 'Grid',
                    listProperties: ['_id', 'name', 'email', 'role', 'isAdmin'],
                    editProperties: ['name', 'email', 'role', 'isAdmin'],
                    showProperties: ['_id', 'name', 'email', 'role', 'isAdmin'],
                    filterProperties: ['role', 'isAdmin'],
                },
            }
        ],
        branding: {
            companyName: 'Dashboard | AdminJS',
            softwareBrothers: false,
            withMadeWithLove: false,
            favicon: '/bed.png',
            logo: '/bed.png',

        }
    }
    // Please note that some plugins don't need you to create AdminJS instance manually,
    // instead you would just pass `adminOptions` into the plugin directly,
    // an example would be "@adminjs/hapi"
    const admin = new AdminJS(adminOptions)

    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)


    // Serve static files from the "public" folder
    const __dirname = path.resolve(); // Get the current directory
    app.use(express.static(path.join(__dirname, 'public'))); // Serve the "public" directory

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
}

start()