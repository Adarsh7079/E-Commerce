import express from "express";
import {
  getAllProducts,
  createProduct,
  updatePoduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
} from "../controllers/product.controller.js";
import { isAuthenticatedUser,authorizeRoles } from "../middleware/auth.js";

const router = express();

router.route("/product").get(getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser,authorizeRoles("admin"), updatePoduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct)
 
  router.route("/product/:id").get(getProductDetails);
  router.route("/review").put(isAuthenticatedUser,createProductReview);
  router.route("/reviews").get(isAuthenticatedUser,getProductReviews)
  .delete(isAuthenticatedUser,deleteProduct);

export default router;
