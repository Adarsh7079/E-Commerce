import express from "express"
import { deleteUser, forgotPassword, getAllUsers, getSingleUser, getUserDetails, loginuser, logout, register, resetPassword, updateUserPassword, updateUserProfile, updateUserRole } from "../controllers/user.controller.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";


const router=express();

router.route("/register").post(register);
router.route("/login").post(loginuser);
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updateUserPassword);
router.route("/me/update").put(isAuthenticatedUser,updateUserProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);
router.route("/admin/users/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);
export default router
