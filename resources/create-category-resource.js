import { Category } from "../models/category.model.js"

export const createCategoryResource = () => {
    return (
        {
            resource: Category,
            options: {
                navigation: {
                    icon: "Tag",
                },
                listProperties: ['_id', 'title'],
                properties: {
                    title: {
                        id: "Category Name"
                    },
                    createdAt: { isVisible: { list: false, show: true, edit: false, filter: true } },
                    updatedAt: { isVisible: { list: false, show: true, edit: false, filter: false } },
                }
            },
        }
    )
}