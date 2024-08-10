import express from "express"

// geting product rout 
import product from "./routes/product.routes.js"
import cookieparser from "cookie-parser"

const app=express();
app.use(express.json());
app.use(
    express.urlencoded({
    extended:true
}))
app.use(cookieparser())

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

