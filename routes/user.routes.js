import express from "express"
import { forgotPassword, loginuser, logout, register } from "../controllers/user.controller.js";


const router=express();

router.route("/register").post(register);
router.route("/login").post(loginuser);
router.route("/password/forgot").post(forgotPassword)
router.route("/logout").get(logout);
export default router
