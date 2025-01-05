import { model, Schema } from 'mongoose';
import 'dotenv/config'
import bcrypt from 'bcrypt';

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
        role: {
            type: String,
            required: true,
            enum: ['user', 'admin', 'superadmin'],
            default: 'user'
        }
    },
    { timestamps: true }
);

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = process.env.PASSWORD_SALT;
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (error) {
        next(error);
    }
});

// Add a method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = model('User', userSchema);
