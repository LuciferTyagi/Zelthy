import React, { useEffect, useState } from "react";
import axios from "axios";
import { defaultAvailability, timeSlots } from "./Constant.js";

const daysOfWeek = Object.keys(defaultAvailability);

const Availablity = () => {
  const [availability, setAvailability] = useState(defaultAvailability);
  const [copyMenu, setCopyMenu] = useState({ isOpen: false, day: "", selectedDays: [] });


  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/availability/myAvailability", {
          headers: { Authorization: localStorage.getItem("token") },
        });

        setAvailability(response.data.availability || defaultAvailability);
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
    <div>
      <h1 className="text-5xl font-bold text-[#0A2540]">Availability</h1>
      <div className="flex flex-col gap-4 mt-10">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex items-center gap-4 ">
            <p className="text-lg text-[#476788] font-medium w-32">{day}</p>
            {availability[day].isAvailable ? (
              <>
                <select
                  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                  className="bg-neutral-100 rounded-lg p-3 text-lg text-[#476788] font-medium outline-none"
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
                  className="bg-neutral-100 rounded-lg p-3 text-lg text-[#476788] font-medium outline-none"
                  value={availability[day].endTime}
                  onChange={(e) => handleTimeChange(day, "endTime", e.target.value)}
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>

                <img
                  src="/images/close.png"
                  alt="close"
                  className="size-4 mx-4 cursor-pointer"
                  onClick={() => handleToggleAvailability(day)}
                />
                <img
                  onClick={() => handleCopyClick(day)}
                  src="/images/copy.png"
                  alt="copy"
                  className="size-4 cursor-pointer"
                />
              </>
            ) : (
              <>
                <p className="text-lg text-red-500 font-medium">Unavailable</p>
                <img
                  src="/images/plus.png"
                  alt="plus"
                  className="size-5 cursor-pointer"
                  onClick={() => handleToggleAvailability(day)}
                />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Copy Menu */}
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

      {/* Save Button */}
      <button
        onClick={updateAvailabilityInBackend}
        className="mt-5 bg-green-500 text-white px-6 py-3 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Availablity;
