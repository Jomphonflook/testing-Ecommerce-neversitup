import * as mongoose from 'mongoose';
import { IUser } from '../interface/user.interface';

export const UserSchema = new mongoose.Schema<IUser>({
    email: {
        unique: true,
        type: String,
        required: true
    },
    username: {
        unique: true,
        type: String,
        required: true
    },
    password: { type: String, required: true },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },

}, { timestamps: true }
);