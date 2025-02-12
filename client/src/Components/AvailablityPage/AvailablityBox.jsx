import React, { useState } from 'react'
import { defaultAvailability, timeSlots } from './Constant';
import { useDispatch, useSelector } from 'react-redux';
import { setTimezone } from '../../Redux/Slices/UserSlice';
import TimeZone from './TimeZone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPlus, faX } from '@fortawesome/free-solid-svg-icons';

const AvailablityBox = ({handleTimeChange , handleToggleAvailability , handleCopyClick}) => {
const dispatch = useDispatch();
const [showDropdown, setShowDropdown] = useState(false);
const{availability} = useSelector((state) => state.user)
const daysOfWeek = Object.keys(defaultAvailability);
const handleTimezoneChange = (tz) => {
    dispatch(setTimezone(tz));
    setShowDropdown(false); 
  };
  return (
    <div style={{boxShadow:" rgba(0, 0, 0, 0.24) 0px 3px 8px"}} className="flex flex-col gap-4 mt-6 rounded-md md:rounded-lg p-3 md:p-6 lg:p-8 dark:bg-[#1E1E1E]">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex flex-wrap items-center gap-4 bg--300 ">
            <p className="text-sm md:text-base text-[#476788] dark:text-white font-medium w-20 md:w-24 bg--300 capitalize">{day}</p>
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

                <span className="text-lg text-[#476788] dark:text-white">-</span>

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
                <FontAwesomeIcon onClick={() => handleToggleAvailability(day)} icon={faX} className='size-3 md:size-4 dark:text-white md:mx-2 cursor-pointer'/>
                <FontAwesomeIcon onClick={() => handleCopyClick(day)} icon={faCopy} className='size-3 md:size-4 dark:text-white  cursor-pointer'/>
              </>
            ) : (
              <>
                <p className="text-sm text-zinc-300 ">Unavailable</p>
                <FontAwesomeIcon onClick={() => handleToggleAvailability(day)} icon={faPlus} className='size-4 dark:text-white cursor-pointer'/>
              </>
            )}
          </div>
        ))}
        
      <TimeZone showDropdown={showDropdown} setShowDropdown={setShowDropdown} handleTimezoneChange={handleTimezoneChange}/>
      </div>
  )
}

export default AvailablityBox
