import express from "express";
import {
  getAllProducts,
  createProduct,
  updatePoduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/product.controller.js";
import { isAuthenticatedUser,authorizeRoles } from "../middleware/auth.js";

const router = express();

router.route("/product").get(getAllProducts);

router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, updatePoduct)
  .delete(isAuthenticatedUser, deleteProduct)
  .get(getProductDetails);

export default router;
