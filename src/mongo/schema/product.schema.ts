import mongoose from "mongoose";
import { IProduct } from "../interface/product.interface";

export const ProductSchema = new mongoose.Schema<IProduct>({
    name: {
        unique: true,
        type: String,
        required: true
    },
    price : {
        type: Number,
        require: true
    },
    amount : {
        type: Number,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
})