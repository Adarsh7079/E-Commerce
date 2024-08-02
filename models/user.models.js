import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30, "name can not exid 30 char"],
        minLength:[4, "name shaould have more then 4 char "]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid e-mail"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8, "password shaould have more then 8 char "],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
    
})

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next()
    }
    this.password= await bcrypt.hash(this.password,10);
})

//JWT Token 
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

//compare password
userSchema.methods.comparePassword= async function(enterpassword){
    return  await bcrypt.compare(enterpassword,this.password);
}

//generaing password token
userSchema.methods.getResetPasswordToken=function(){

    //generate token 
    const resetToken=crypto.randomBytes(20).toString("hex");

    //hash password and add resetToken to user Schema 
    this.resetPasswordToken=crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire= Date.now()+15*60*1000;

    return resetToken;

}

export const User=mongoose.model("User",userSchema)