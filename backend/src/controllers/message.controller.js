import User from "../models/user.model.js";
import Message from "../models/message.model.js";  // Make sure you're importing the correct model
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);  // Fixed the typo here (satus => status)
    } catch (error) {
        console.error("Error in getting users for sidebar", error.message);
        res.status(500).json({ error: "Internal error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({  // Fixed MessageChannel to message (correct model)
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getting messages", error.message);
        res.status(500).json({ error: "Internal error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({  // Fixed 'message' here to correctly reference the model
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // todo: realtime functionality goes here => socket.io
        res.status(201).json(newMessage);  // Fixed the typo here (satus => status)
    } catch (error) {
        console.log("Error in SendMessage controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
