import express from "express"
import { getAllProducts ,createProduct, updatePoduct, deleteProduct, getProductDetails} from "../controllers/product.controller.js";

const route=express();

route.route("/product").get(getAllProducts)
route.route("/product/new").post(createProduct)
route.route("/product/new").post(createProduct)
route.route("/product/:id").put(updatePoduct)
.delete(deleteProduct).get(getProductDetails)




export default route