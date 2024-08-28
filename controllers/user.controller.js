import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ErrorHandler} from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto"
import cloudinary from "cloudinary"

export const register = asyncHandler(async (req, res, next) => {
    try {
     
       const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });

        // console.log("File uploaded successfully:", myCloud);
        console.log("got data ",req.body);
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email });
        
        if (userExist) {
            return next(new ErrorHandler('User already exists', 404));
        }

        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        });

        sendToken(user, 201, res);
    } catch (error) {
        console.error('Registration Error:', error);
        return next(new ErrorHandler('Registration failed', 500));
    }
});

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

    
});

//get user detils 
export const getUserDetails=asyncHandler(async(req,res,next)=>{
    if(!user)
        {
            return next(new ErrorHandler("user not found",401))
        }
    const user=await User.findById(req.user.id);
    
    res.status(200).json({
        success:true,
        user
    });
});

//Update user Password
export const updateUserPassword=asyncHandler(async(req,res,next)=>{
  
    const user=await User.findById(req.user.id).select("+password");
    
    const isPasswordMatch= await user.comparePassword(req.body.oldPassword)
    if(!isPasswordMatch)
    {
        return next(new ErrorHandler("Old password is incorrect",400))
    }

    if(req.body.newPassword !==req.body.confirmPassword){
        return next(ErrorHandler("Password doesn't match",400))
    }

    user.password=req.body.newPassword;
    await user.save();

    sendToken(user,200,res);
});

//Update user Profile
export const updateUserProfile=asyncHandler(async(req,res,next)=>{
  
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    }
    //we will add cloudinary letter 
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,

    })
    
});

//get all user(Admin)
export const getAllUsers=asyncHandler(async(req,res,next)=>{
    const users=await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

//get all Single user(Admin)
export const getSingleUser=asyncHandler(async(req,res,next)=>{
    const users=await User.findById(req.params.id);

    if(!users)
    {
        return next(new ErrorHandler("user does not exist with id",401))
    }

    res.status(200).json({
        success:true,
        users
    })
})

//Update user Role
export const updateUserRole=asyncHandler(async(req,res,next)=>{
  
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
 // await user.save()
    res.status(200).json({
        success:true,

    })
    
});

//delete user Role(admin)
export const deleteUser=asyncHandler(async(req,res,next)=>{

    const user=await User.findById(req.params.id)
   
    if(!user){
        return next(new ErrorHandler(`user does not exist with id ${req.params.id}`))
    }
    await user.deleteOne(user._id);
    // we will remove cloudinary 
    res.status(200).json({
        success:true,
        message:"user deleted"
    })
    
});