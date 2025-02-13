# Zelthy Slot Booking - Frontend

This is the frontend of the Zelthy Slot Booking application, built using **React.js + Redux Toolkit + javascript + Tailwind CSS + Framer-Motion**.

## 🚀 Features
- User authentication (Sign Up / Login)
- Manage availability & daily schedules
- View all users and their availability
- Responsive UI with Tailwind CSS

## 📦 Tech Stack
- **React.js** (with javascript)
- **Redux Toolkit** (for state management)
- **React Router** (for navigation)
- **Axios** (for API calls)
- **Tailwind CSS** (for styling)
- **Framer-Motion** (for Animation)

## 🛠️ Setup & Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/LuciferTyagi/Zelthy
cd   Zelthy
```

### **2️⃣ Install Dependencies**
npm install

### **4️⃣ Start the Frontend**
npm run dev


###  Folder Structure**
client/
│── public/images           # Contains static assets like images
│── src/
│   ├── components/   # Reusable UI components
│   ├── AvailablityPage/  
│   │   ├── All availability-related components
│   │   ├── Constant.js (constants used in this page)
│   ├── LandingPage/  # Contains landing page components
│   ├── SlotPage/     # Main page after login
│   │   ├── Dashboard/
│   │   ├── Sidebar/
│   │   ├── Header/
│   │   ├── All Users/
│   │   ├── Edit Profile/
│   │   ├── Faq/
│   │   ├── Footer/
│   │   ├── ProtectedRoute/
│   ├── Redux/        # Redux store and slices
│   ├── Utils/        # Utility functions/constants
│── package.json
│── README.md
