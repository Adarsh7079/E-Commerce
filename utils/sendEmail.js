import nodeMailer from "nodemailer";

export const sendEmail= async(options)=>{
    const transporter=nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service:process.env.SMPT_SERVICE, 
        secure:true,
        logger:true,
        debug:true,
        secureConnection:false,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        },
        tls:{
            rejectUnauthorized:true
        }
    });

    const mailOptions={
        from :process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    };

    await transporter.sendMail(mailOptions)
}