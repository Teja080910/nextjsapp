import mongoose from "mongoose";

export const registeSchema=new mongoose.Schema({
    Name:{type:String},
    Password:{type:String}
})