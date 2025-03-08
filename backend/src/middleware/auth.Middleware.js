import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Get the token from cookies

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Verify the token using the JWT secret
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized - Invalid token." });
        }

        // Find the user from the decoded userId
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach the user to the request object
        req.user = user;

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.log("Error in ProtectRoute MiddleWare:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default protectRoute;
