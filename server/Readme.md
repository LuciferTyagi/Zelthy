# Zelthy Slot Booking - Backend

This is the backend of the Zelthy Slot Booking application, built using **Node.js, Express, MongoDB**.

## 🚀 Features
- User authentication using JWT
- Manage user availability & scheduling(Both Weekly and Daily)
- Secure API routes with authentication
- MongoDB for database storage

## 📦 Tech Stack
- **Node.js** (Runtime)
- **Express.js** (Backend framework)
- **MongoDB + Mongoose** (Database)
- **JWT** (Authentication)
- **Cors & dotenv** (Security & environment management)

## 🛠️ Setup & Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/LuciferTyagi/Zelthy
cd Zelthy/server
```
## **1️⃣ Clone the Repository**
npm install

## **3️⃣ Set Up Environment Variables**
PORT=8000
MONGO_URI=mongodb+srv://your_mongo_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET

## **4️⃣ Start the Backend Server**
npm Start

## **Folder Structure**
server/
│── controllers/   # Route handlers
│── models/        # Mongoose models
│── routes/        # Express routes
│── middleware/    # Authentication & validation
│── config/        # Database configuration
│── .env           # Environment variables
│── package.json   # Dependencies & scripts
│── vercel.json    # Routes redirection 
