import e from 'express';
import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        role:{
            type: String,
            required: true,
            enum: ['user', 'admin', 'superadmin'],
            default: 'user'
        }
    },
    { timestamps: true }
);

export const User = model('User', userSchema);