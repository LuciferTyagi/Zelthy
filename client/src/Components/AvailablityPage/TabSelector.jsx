import React, { useState } from 'react'

const TabSelector = ({ tabSelector, setTabSelector }) => {


  return (
    <div className="Tab-Selection bg-[#066BFF] dark:bg-white rounded-md flex gap-2 w-fit p-1 md:p-2 text-sm md:text-base mt-2">
            <button onClick={() => setTabSelector("List View")}     className={`${tabSelector === "List View" ?  "bg-white dark:bg-black dark:text-white text-black " : "bg-transparent text-white dark:text-[#b0b0b0]"} p-2 rounded-md `}>List View</button>
            <button onClick={() => setTabSelector("Calendar View")} className={`${tabSelector === "Calendar View" ? "bg-white dark:bg-black dark:text-white" : "bg-transparent text-white dark:text-[#b0b0b0]"} p-2 rounded-md`}>Calendar View</button>
    </div>
  )
}

export default TabSelector
