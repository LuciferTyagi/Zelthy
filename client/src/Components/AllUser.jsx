import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/allusers") 
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const fetchAvailability = (userId, name) => {
    setSelectedUser(name); 
    setAvailability(null); 
    axios
    .get(`http://localhost:8000/api/availability/${userId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((response) => setAvailability(response.data.availability))
    .catch((error) => console.error("Error fetching availability:", error));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
        
      <ul className="list-disc pl-5">
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user._id}
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => fetchAvailability(user._id, user.username)}
            >
              {user.username}
            </li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>

      {availability && (
        <div className="mt-6 p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Availability for {selectedUser}</h3>
          <ul className="mt-2">
            {Object.entries(availability).map(([day, details]) => (
              <li key={day} className="text-gray-700">
                <strong className="capitalize">{day}:</strong>{" "}
                {details.isAvailable
                  ? `${details.startTime} - ${details.endTime}`
                  : "Not Available"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllUser;
