export const sendToken=(user,statusCode,res)=>{
    const token=user.getJWTToken();

    const options={
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*6060*1000
        ),
        httpOnly:true,
    }
   // console.log("user i got ",user)
    res.status(statusCode).cookie('tok en',token,options).json({
        success:true,
        user,
        token
    })
}
