import AdminJSExpress from '@adminjs/express';
import { authenticate, sessionStore } from './index.js';

// Build Authenticated Router for AdminJS


export const expressAuthenticatedRouter = (adminjs)=>{
    return AdminJSExpress.buildAuthenticatedRouter(
        adminjs,
        {
            authenticate,
            cookieName: 'dashboard',
            cookiePassword: process.env.COOKIE_SECRET || 'dashboardsecret',
        },
        null,
        {
            store: sessionStore,
            resave: false,
            saveUninitialized: false,
            secret: process.env.COOKIE_SECRET || 'dashboardsecret',
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            },
            name: 'adminjs-dashboard',
        }
    );
}