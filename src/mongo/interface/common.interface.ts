import mongoose from "mongoose";

export interface ICommon {
    isActive: boolean,
    isDelete: boolean,
    createdBy?: mongoose.Schema.Types.ObjectId,
    updatedBy?: mongoose.Schema.Types.ObjectId,
    deletedBy?: mongoose.Schema.Types.ObjectId
}

export interface IResponse {
    result : {
        status : number,
        message : string,
        data? : Object[]
    }
}