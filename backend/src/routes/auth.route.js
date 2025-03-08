import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controllers.js";
import protectRoute from "../middleware/auth.Middleware.js";

const router = express.Router();

router.post("/signup", signup);  // Handle signup
router.post("/login", login);     // Handle login
router.get("/logout", logout);    // Ensure token validation before logout

// Protect the update-profile route with protectRoute
router.put("/update-profile", protectRoute, updateProfile);

// Protect the check route with protectRoute
router.get("/check", protectRoute, checkAuth);

export default router;
