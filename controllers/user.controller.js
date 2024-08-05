import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ErrorHandler} from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto"

export const register=asyncHandler(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const userexist= await User.findOne({email});
    if(userexist)
    {
        return next(new ErrorHandler('user already exist',404))
    }
    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"123131313",
            url:'http/adasdasd'
        }

    })
    sendToken(user,201,res)
})

//login 
export const loginuser=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter email & password",4000));
    }

    const user=await User.findOne({email}).select('+password');

    if(!user)
    {
        return next(new ErrorHandler("Invalid email & password",401))
    }

    const isPasswordMatch= await user.comparePassword(password)
    if(!isPasswordMatch)
    {
        return next(new ErrorHandler("Invalid email & password",401))
    }
    sendToken(user,200,res);
})

//logout
export const logout=asyncHandler(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    });
});

export const forgotPassword=asyncHandler(async(req,res,next)=>{

    const user=await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User  not found ",404));
    }

    //get resetPasswordToken 
    const resetToken=user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPassworUrl=`${req.protocol}://${req.get(
        "host"
    )}/api/v1/password/reset${resetToken}`;

    const message=`Your password reset token is:- \n\n ${resetPassworUrl} \n\n If you have not requested this email then , please ignore it`;

    try{
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password recovery`,
            message
        });

        res.status(200).json({
            success:true,
            message:`Email send to ${user.email} successfully`
        })
    }
    catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,404));
    }
})

export const resetPassword=asyncHandler(async(req,res,next)=>{

    //createing token has
    const resetPasswordToken=crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user=await User.findOne({
        resetPasswordToken
    })
    if(!user)
    {
        return next(new ErrorHandler("user not found",401))
    }

    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",401))
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    //login 
    sendToken(user,200,res);

    
})

//get user detils 
export const getUserDetails=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})