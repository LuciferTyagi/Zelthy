import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { timeSlots } from "./Constant";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchDailyAvailability, removeDailyAvailability } from "../../Redux/Slices/UserSlice";
import DailyAvailablityBox from "./DailyAvailablityBox";
import { BASE_URL } from "../../Utils/Constant";

const DailyAvailability = () => {
  const dispatch = useDispatch();
 
  const dailyAvailability = useSelector((state) => state.user.dailyAvailability);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    if (userId) {
      dispatch(fetchDailyAvailability());
    }
   
  }, [userId, dispatch]);


  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/daily-availability/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
  
      dispatch(removeDailyAvailability(id)); 
      alert("Availability deleted successfully!");
    } catch (error) {
      console.error("Error deleting availability:", error);
    }
  };
  return (
    <div style={{boxShadow:" rgba(0, 0, 0, 0.24) 0px 3px 8px"}} className="rounded-lg flex flex-col-reverse xl:flex-row gap-8 py-12 px-4 md:px-8 mt-6 dark:bg-[#1E1E1E]">
       
        <DailyAvailablityBox />
        
        <div className="Daily-Availability-List flex flex-col gap-4 w-full max-w-md mx-auto">
          {dailyAvailability.map((availability) => (
        <div key={availability._id} className="bg-white shadow-lg rounded border border-gray-200 flex flex-wrap items-center gap-4 p-1 md:p-2 text-sm md:text-base">
       
             <p className="text-gray-600">
                 {new Date(availability.date).toLocaleDateString("en-GB", {day: "2-digit",month: "short",year: "numeric",})}
             </p>

          <p className="text-gray-600">{availability.startTime}</p>
          <p className="text-gray-600">{availability.endTime}</p>
          <p className={`px-2 py-1 text-sm font-semibold rounded ${availability.isAvailable ? "bg-green-100 text-green-700 " : "bg-red-100 text-red-700 cursor-not-allowed"}`}>
            {availability.isAvailable ? "Yes Available" : "Not Available"}
          </p>
          <button className="  dark:text-white" onClick={() => handleDelete(availability._id)}><FontAwesomeIcon icon={faX} className="dark:text-black" /></button>
        </div>
      ))}
       </div>

        
    </div>
  );
};

export default DailyAvailability;
