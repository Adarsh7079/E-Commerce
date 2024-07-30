import {app} from "./app.js"
import dotenv from "dotenv"
import connectDb from "./db/database.js"

dotenv.config({path:"./config.env"})
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Server is running : ${process.env.PORT}`);
  
})
connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is working on port : ${process.env.PORT} `)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed!!!",err);
})

//for unhanlde serve crash
process.on("UnhandleRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shuting down the server due to unhandled Promise rejection`);
    server.close(()=>{
        process.exit(1)
    })
})