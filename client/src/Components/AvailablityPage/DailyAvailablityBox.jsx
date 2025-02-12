import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { timeSlots } from "./Constant";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyAvailability } from '../../Redux/Slices/UserSlice';
import { BASE_URL } from '../../Utils/Constant';

const DailyAvailablityBox = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const handleSave = async () => {
    if (!selectedDate || !startTime || !endTime) {
      alert("Please select a date and time slots");
      return;
    }
    try {
      await axios.post(`${BASE_URL}/api/daily-availability`, {
        userId,
        date: selectedDate,
        isAvailable,
        startTime,
        endTime,
      });
      alert("Availability saved successfully!");
      setSelectedDate(null);
      setStartTime("");
      setEndTime("");
      setIsAvailable(false);
      dispatch(fetchDailyAvailability());
    } catch (error) {
      console.error("Error saving availability", error);
    }
  };
  return (
    <div  className="p-5 bg-white rounded-md shadow-md w-full max-w-md mx-auto text-sm md:text-base">
                <h2 className="text-xl font-bold mb-4 text-center">Set Daily Availability</h2>
          <label className="block text-gray-700 font-medium">Select Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()} 
            className="w-full border rounded-md p-2 mb-3"
          />
    
          <label className="block text-gray-700 font-medium">Start Time</label>
          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border rounded-md p-2 mb-3"
          >
            <option value="">Select Start Time</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
    
          <label className="block text-gray-700 font-medium">End Time:</label>
          <select
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border rounded-md p-2 mb-3"
          >
            <option value="">Select End Time</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
    
          <label className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
              className="mr-2"
            />
            Available
          </label>
    
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 dark:bg-black text-white p-2 rounded-md "
          >
            Save Availability
          </button>
            </div>
  )
}

export default DailyAvailablityBox
