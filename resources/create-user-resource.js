import { User } from "../models/user.model.js";

export const createUserResource = () => {
    return (
        {
            resource: User,
            options: {
                id: "users",
                navigation: {
                    icon: "Users",
                },
                listProperties: ['name', 'email', 'role', 'isAdmin'],
            },
        }
    )
}