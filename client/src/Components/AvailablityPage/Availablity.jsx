import React, {  useState } from "react";
import axios from "axios";
import { defaultAvailability } from "./Constant.js";
import { useDispatch, useSelector } from "react-redux";
import {   updateAvailability  } from "../../Redux/Slices/UserSlice.js";
import CopyMenu from "./CopyMenu.jsx";
import AvailablityBox from "./AvailablityBox.jsx";
const daysOfWeek = Object.keys(defaultAvailability);

const Availablity = () => {
  const dispatch = useDispatch();
  const { availability, timezone } = useSelector((state) => state.user);
  const [copyMenu, setCopyMenu] = useState({ isOpen: false, day: "", selectedDays: [] });

  const handleToggleAvailability = (day) => {
    dispatch(
      updateAvailability({
        day,
        newAvailability: {
          ...availability[day],
          isAvailable: !availability[day].isAvailable,
        },
      })
    );
  };
  
  const handleTimeChange = (day, type, value) => {
    dispatch(
      updateAvailability({
        day,
        newAvailability: {
          ...availability[day],
          [type]: value,
        },
      })
    );
  };

 
  const handleCopyClick = (day) => {
    setCopyMenu({ isOpen: true, day, selectedDays: [] });
  };

 

  const applyCopiedTime = () => {
    const { day, selectedDays } = copyMenu;
    const { startTime, endTime } = availability[day];
  
    selectedDays.forEach((selectedDay) => {
      dispatch(
        updateAvailability({
          day: selectedDay,
          newAvailability: {
            isAvailable: true,
            startTime,
            endTime,
          },
        })
      );
    });
  
    setCopyMenu({ isOpen: false, day: "", selectedDays: [] });
  };


  const updateAvailabilityInBackend = async () => {
    try {
      await axios.put(
        "http://localhost:8000/api/availability/update",
        { availability , timezone },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      alert("Availability updated successfully!");
    } catch (error) {
      console.error("Error updating availability", error);
    }
  };

  return (
    <div className="bg-green-300 w-full">
      <h1 className = "text-3xl md:text-5xl font-bold text-blue-500 ">Availability</h1>
      <p  className = "text-sm md:text-lg text-zinc-500 font-medium mt-0.5 md:mt-2">Set your available time slots for booking</p>

      <AvailablityBox handleTimeChange={handleTimeChange} handleToggleAvailability={handleToggleAvailability} handleCopyClick={handleCopyClick}/>

      {copyMenu.isOpen && (
        <CopyMenu daysOfWeek={daysOfWeek} applyCopiedTime={applyCopiedTime} copyMenu={copyMenu} setCopyMenu={setCopyMenu}/>
      )}

      <button onClick={updateAvailabilityInBackend} className="Save-Button mt-5 bg-[#006BFF] text-white px-4 lg:px-6 py-3 rounded-lg font-semibold" >Save Changes</button>
    </div>
  );
};

export default Availablity;
