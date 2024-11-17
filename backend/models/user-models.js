import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type: Number,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    role:{
        type: String,
        //to tell whether you are a student or recruiter
        enum:['student','recruiter'],
        required:true,
    },
    profile:{
        bio:{type:String},
        skills: [{type:String}],
        resume: {type:String}, // url for resume
        resumeOriginalName:{type:String},
        company: {type:mongoose.Schema.Types.ObjectId, //relation btwn company and user
            ref:'Company'},
        profilePhoto:{
            type:String,
            default:""
        }
    },
}, {timestamps:true});
export const User = mongoose.model('User', userSchema);