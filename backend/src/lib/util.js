import jwt from "jsonwebtoken";  // Ensure you import jwt if you haven't already

export const generateToken = (userId, res) => {
    try {
        // Generate JWT with a payload containing the userId and a 7-day expiration time
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d", // Token will expire in 7 days
        });

        // Ensure JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret is not defined in environment variables");
        }

        // Set the JWT in a secure, httpOnly cookie with the same expiration
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true, // Prevent access to the cookie from client-side JS
            sameSite: "strict", // Prevent sending cookies with cross-site requests
            secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
            // Optionally, you can set expires for an explicit expiration date:
            // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        });

        // Return the token to the caller in case it's needed
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;  // You can handle this more gracefully depending on your app's error handling strategy
    }
};
