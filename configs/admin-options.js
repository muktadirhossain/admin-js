import { createCategoryResource } from "../resources/create-category-resource.js";
import { createUserResource } from "../resources/create-user-resource.js";


// const __dirname = path.resolve(); // Get the current directory

// const Components = {
//     Dashboard: componentLoader.add('Dashboard', path.join(__dirname, '/adminjs-components/dashboard.jsx')),
//     // other custom components
// }

const adminOptions = {
    rootPath: '/admin',
    branding: {
        companyName: 'Dashboard | AdminJS',
        softwareBrothers: false,
        withMadeWithLove: false,
        favicon: '/favicon.ico',
        logo: '/logo.png',
    },
    // We pass Category to `resources`
    resources: [
        createCategoryResource(),
        createUserResource()
    ],
}

export default adminOptions;