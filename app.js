import express from "express"
import cors from "cors"
// geting product rout 
import product from "./routes/product.routes.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"

const app=express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))

app.use(express.static("public"))
app.use(cookieParser())  
app.use(bodyParser.urlencoded({ extended: true,limit:"16kb" }));
app.use(fileUpload());


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());


app.use("/api/v1",product);

//middleware for erro 
import { error } from "./utils/error.js";
app.use(error)

import user from "./routes/user.routes.js"
app.use("/api/v1",user);

//orrder 
import order from "./routes/order.routes.js"
app.use("/api/v1",order)

export{app}

