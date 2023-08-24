import { ICommon } from "./common.interface";

export interface IProduct extends ICommon {
    name : string,
    price : number,
    amount : number
}