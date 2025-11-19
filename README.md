# 🚀 Real-Time Chat Application

A full-stack real-time chat application built with **React (Vite)**, **Node.js**, **Express**, **Socket.io**, **MongoDB**, and **Cloudinary**.

It supports real-time messaging, image sharing, JWT authentication using HTTP-only cookies, online user tracking, and a clean UI using Tailwind CSS + Zustand.

---

## 🎯 Features

- 🔐 **JWT Authentication** (secure, httpOnly cookies)
- ⚡ **Real-time messaging** using Socket.io
- 👤 **Online/offline user status**
- 🖼️ **Image messaging** (Cloudinary upload)
- 🎨 **Light/Dark theme** (via Zustand)
- 📡 **REST API** with Express
- 🗂️ **MongoDB** for user + message storage
- 🛠️ **Zustand** state management
- 🧰 Clean folder structure
- 🔄 Auto-refresh on auth state change

---

## 🧰 Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS + DaisyUI
- Zustand
- React Router
- Socket.io Client
- React Hot Toast
- Lucide Icons

### **Backend**
- Node.js
- Express.js
- Socket.io
- MongoDB + Mongoose
- Cloudinary
- JWT Authentication
- CORS + Cookies

---

# 🏗️ Setup Instructions (Local Development)

Follow these steps to run the app locally.



## 📦 1. Clone the Repository

git clone <your-repo-url>
cd <project-folder>


## 🖥️ 2. Backend Setup
cd backend
"""npm install"""

---

📄 3. Create .env file inside backend/
PORT=5000
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:5173

---

▶️ 4. Run backend
npm run dev


Backend will run on:

http://localhost:5000

🎨 5.Frontend Setup
cd ../frontend
npm install

(Optional) Create frontend/.env

If you want custom API URL:

VITE_API_URL=http://localhost:5000

---

▶️ 6. Run frontend
""npm run dev""


Frontend will run at:

http://localhost:5173

📡 Important Notes
✔ Increase Express body size (for base64 images)

Backend must include:

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

✔ CORS must allow credentials
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

✔ Axios/fetch (frontend) must send cookies
axios.defaults.withCredentials = true;


or:

fetch(url, { credentials: "include" })

✔ Socket.io client must send userId

Example:

const socket = io(SERVER_URL, {
  query: { userId: authUser._id },
});

📡 Socket.io Flow (Simple)

Backend stores online users:

userSocketMap[userId] = socket.id;


Emits list of online users:

io.emit("getOnlineUsers", Object.keys(userSocketMap));


Sends new messages:

io.to(receiverSocketId).emit("newMessage", message);
