import mongoose from "mongoose";
import { ICommon } from "./common.interface";

export enum StatusOrderEnum {
    PAID = "paid",
    WAITING_FOR_PAYMENT = "waiting-for-payment",
    CANCELED = "canceled"
}

export interface IOrder extends ICommon {
    userId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    amount: number,
    status: StatusOrderEnum
}