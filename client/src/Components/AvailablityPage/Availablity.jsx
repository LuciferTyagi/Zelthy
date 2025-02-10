import React, { useEffect, useState } from "react";
import axios from "axios";
import { defaultAvailability, timeSlots } from "./Constant.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setReduxAvailability } from "../../Redux/Slices/UserSlice.js";
const daysOfWeek = Object.keys(defaultAvailability);

const Availablity = () => {
  const [availability, setAvailability] = useState(defaultAvailability);
  const [copyMenu, setCopyMenu] = useState({ isOpen: false, day: "", selectedDays: [] });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/availability/myAvailability", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        const fetchedAvailability = response.data.availability || defaultAvailability;
        setAvailability(fetchedAvailability);
        dispatch(setReduxAvailability(fetchedAvailability));
      } catch (error) {
        console.error("Error fetching availability", error);
      }
    };

    fetchAvailability();
  }, []);


  const handleToggleAvailability = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable,
      },
    }));
  };


  const handleTimeChange = (day, type, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
      },
    }));
  };

 
  const handleCopyClick = (day) => {
    setCopyMenu({ isOpen: true, day, selectedDays: [] });
  };

  const handleDaySelection = (selectedDay) => {
    setCopyMenu((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(selectedDay)
        ? prev.selectedDays.filter((d) => d !== selectedDay)
        : [...prev.selectedDays, selectedDay],
    }));
  };

  const applyCopiedTime = () => {
    const { day, selectedDays } = copyMenu;
    const { startTime, endTime } = availability[day];

    setAvailability((prev) => {
      const updatedAvailability = { ...prev };

      selectedDays.forEach((selectedDay) => {
        updatedAvailability[selectedDay] = {
          isAvailable: true,
          startTime,
          endTime,
        };
      });

      return updatedAvailability;
    });

    setCopyMenu({ isOpen: false, day: "", selectedDays: [] });
  };


  const updateAvailabilityInBackend = async () => {
    try {
      await axios.put(
        "http://localhost:8000/api/availability/update",
        { availability },
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
      <div style={{boxShadow:" rgba(0, 0, 0, 0.24) 0px 3px 8px"}} className="flex flex-col gap-4 mt-6 rounded-md md:rounded-lg p-3 md:p-6 lg:p-10 bg-yellow-100">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex flex-wrap items-center gap-4 bg-red-300 ">
            <p className="text-sm md:text-base text-[#476788] font-medium w-20 md:w-24 bg-pink-300 capitalize">{day}</p>
            {availability[day].isAvailable ? (
              <>
                <select
                  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                  className="bg-neutral-100 rounded   p-1 text-sm  md:p-2   text-[#476788]  outline-none "
                  value={availability[day].startTime}
                  onChange={(e) => handleTimeChange(day, "startTime", e.target.value)}
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>

                <span className="text-lg text-[#476788]">-</span>

                <select
                  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                  className="bg-neutral-100 rounded   p-1 text-sm md:p-2 text-[#476788]  outline-none"
                  value={availability[day].endTime}
                  onChange={(e) => handleTimeChange(day, "endTime", e.target.value)}
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>

                <img src="/images/close.png" alt="close" className="size-2 md:size-3 md:mx-2 cursor-pointer" onClick={() => handleToggleAvailability(day)} />
                <img onClick={() => handleCopyClick(day)} src="/images/copy.png" alt="copy" className="size-3 md:size-4 cursor-pointer"/>
              </>
            ) : (
              <>
                <p className="text-sm text-zinc-300 ">Unavailable</p>
                <img src="/images/plus.png" alt="plus" className="size-3 cursor-pointer" onClick={() => handleToggleAvailability(day)}
                />
              </>
            )}
          </div>
        ))}
        <div className="flex gap-3 items-center justify-center w-fit text-xs lg:text-sm text-blue-500">
              <p className="">Indian Standard Time</p>
              <FontAwesomeIcon icon={faAngleDown} className=""/>
        </div>  
      </div>

      {copyMenu.isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Copy Time to:</h2>
            <div className="flex flex-col gap-2">
              {daysOfWeek
                .filter((day) => day !== copyMenu.day)
                .map((day) => (
                  <label key={day} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={copyMenu.selectedDays.includes(day)}
                      onChange={() => handleDaySelection(day)}
                    />
                    <span>{day}</span>
                  </label>
                ))}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setCopyMenu({ isOpen: false, day: "", selectedDays: [] })}
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={applyCopiedTime}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={updateAvailabilityInBackend} className="mt-5 bg-[#006BFF] text-white px-4 lg:px-6 py-3 rounded-lg font-semibold" >
        Save Changes
      </button>
    </div>
  );
};

export default Availablity;
