import { ICommon } from "./common.interface"

export interface IUser extends ICommon {
    email: string
    username: string
    password: string
}