import express from "express"

// geting product rout 
import product from "./routes/product.routes.js"

const app=express();
app.use(express.json());
app.use(
    express.urlencoded({
    extended:true
}))

app.use("/api/v1",product);

//middleware for erro 
import { error } from "./utils/error.js";
app.use(error)

export{app}