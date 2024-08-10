import express from "express";
import {isAuthenticatedUser,authorizeRoles} from "../middleware/auth.js";
import { delteOrder, getAllOrders, getSingleOrder, myOrders, newOrder, updateOrder } from "../controllers/order.controller.js";

const router=express.Router();

router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route("/order/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser,myOrders);
router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
.delete(isAuthenticatedUser,authorizeRoles("admin"),delteOrder);

export default router