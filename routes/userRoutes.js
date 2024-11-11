import express from "express";
import {
  register,
  login,
  updateProfile,
  updatePassword,
  deleteUser,
  getUserProfile,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, getUserProfile);
router.put("/update-profile", auth, updateProfile);
router.put("/update-password", auth, updatePassword);
router.delete("/delete", auth, deleteUser);

export default router;
