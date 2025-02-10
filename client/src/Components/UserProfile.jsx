import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Redux/Slices/UserSlice";


const UserProfile = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  
  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); 
        console.log(decoded)
        setUsername(decoded.username); 
        dispatch(setUser(decoded.username));
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      
      <div className="size-24 bg-yellow-300 rounded-full"></div>

      
      <h3 className="text-3xl font-semibold text-[#0A2540]">
        {username ? username : "Guest User"}
      </h3>

      
      <p className="text-lg text-[#476788]">
        Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.
      </p>
    </div>
  );
};

export default UserProfile;
