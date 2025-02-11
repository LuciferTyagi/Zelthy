import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment-timezone';
import React from 'react'
import { useSelector } from 'react-redux';

const TimeZone = ({showDropdown , setShowDropdown , handleTimezoneChange}) => {
const { timezone } = useSelector((state) => state.user);
const timezones = moment.tz.names();
  return (
    <div>
    <div className="flex gap-3 items-center justify-center w-fit text-xs lg:text-sm text-blue-500 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
    <p>{timezone.replace("_", " ")}</p>
    <FontAwesomeIcon icon={faAngleDown} />
  </div>

  {showDropdown && (
    <div className="absolute bg-white dark:bg-gray-800 shadow-lg p-2 w-60 max-h-60 overflow-y-auto rounded-md">
      {timezones.map((tz) => (
        <p
          key={tz}
          className="px-2 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => handleTimezoneChange(tz)} 
        >
          {tz.replace("_", " ")}
        </p>
      ))}
    </div>
  )}
  </div>
  )
}

export default TimeZone
