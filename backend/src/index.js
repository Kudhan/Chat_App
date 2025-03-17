import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import bodyParser from "body-parser"; // Add this import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration to allow credentials (cookies)
app.use(cookieParser());

// Middleware to parse incoming JSON data with an increased size limit
app.use(bodyParser.json({ limit: '10mb' })); // Increase the size limit here
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // For URL-encoded data

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

// Use the authentication routes
app.use("/api/auth", authRoutes);  // Prefix for auth routes
app.use("/api/messages", messageRoutes);  // Prefix for message routes

// Start the server and connect to the database
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
    connectDB();  // Ensure DB connection is set up
});
