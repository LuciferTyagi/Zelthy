import React from 'react'

const CopyMenu = ({daysOfWeek , applyCopiedTime, copyMenu , setCopyMenu }) => {

    const handleDaySelection = (selectedDay) => {
        setCopyMenu((prev) => ({
          ...prev,
          selectedDays: prev.selectedDays.includes(selectedDay)
            ? prev.selectedDays.filter((d) => d !== selectedDay)
            : [...prev.selectedDays, selectedDay],
        }));
      };
  return (
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
  )
}

export default CopyMenu
