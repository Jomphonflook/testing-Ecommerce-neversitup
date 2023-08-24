import mongoose from "mongoose";
import { IOrder, StatusOrderEnum } from "../interface/order.interface";

export const OrderSchema = new mongoose.Schema<IOrder>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    amount : {
        type: Number,
        require: true
    },
    status : {
        type: String,
        enum : StatusOrderEnum,
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