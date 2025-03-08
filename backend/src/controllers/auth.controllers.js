import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/util.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Signup Controller
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Check if all required fields are provided
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if the email already exists
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Generate a token after the user is saved
        generateToken(newUser._id, res);

        // Respond with user data (excluding password)
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,  // Include profilePic if it's available in your schema
        });

    } catch (error) {
        console.log("Error in signup Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Login Controller (no changes, as per your request)
export const login = async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
         
        const ishashedPassword = await bcrypt.compare(password,user.password);
        if(!ishashedPassword){
            return res.status(400).json({message:"PAssword Incorrect"})
        }
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        });
    }catch(error){
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"INternal Server Error"});

    }
};

// Logout Controller (no changes, as per your request)
export const logout = (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logout Succesfully"});
    }
    catch(error){
        console.log("Error in logout controller",error.message);
        res.status(500).json({message:"INternal Server Error"});
    }
};


export const updateProfile = async(req,res)=>{
    try{
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Profile picture is required"});
        }

        const uploadRespone = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadRespone.secure_url }, { new: true });


        res.status(200).json(updatedUser);
    }
    catch(error){
        console.log("Error in update profile controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
    
}

export const checkAuth = (req,res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkauth controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}
