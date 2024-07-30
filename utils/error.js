import {ErrorHandler} from "./ErrorHandler.js"
export const error=(err,req,res,next)=>{
    err.statusCode=err.statusCode ||500,
    err.message=err.message ||"Internal server error"

    //wrong mongodb error 
    if(err.name==="castError"){
        const message=`Resource not found . Invalid: ${err.path}`;
        err=new ErroHandler(message,400)
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
};