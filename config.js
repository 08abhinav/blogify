import mongoose from "mongoose";

export const PORT  = 8080;

export function dbConnection(url){
    return mongoose.connect(url);
}
