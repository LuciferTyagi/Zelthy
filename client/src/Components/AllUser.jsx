import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="bg--200">
      <h1 className="text-5xl font-bold text-blue-500">Meet Our Community</h1>
      <p className="text-lg text-zinc-500 font-medium mt-2">Browse and see the availability of other users.</p>
      
      <div style={{boxShadow:" rgba(0, 0, 0, 0.24) 0px 3px 8px"}} className="rounded-lg py-20 px-10 bg-white grid grid-cols-[200px_minmax(0,1fr)] mt-6">
            <div className="User-Profiles flex flex-col">
            <ul>
               {users.length > 0 ? (
                users.map((user) => (
                   <li key={user._id} className=" mb-4 cursor-pointer text-zinc-400 hover:text-zinc-700 font-medium  flex items-center gap-3" onClick={() => fetchAvailability(user._id, user.username)}>
                     <div className="w-10 h-10 bg-red-400 rounded-full"></div>
                      {user.username}
                   </li>
                 ))
               ) : (
                <p>No users found</p>
                   )}
              </ul>
            </div>

            <div className="User-Availablity">
            {availability && (
            <div className=" p-4 border rounded-lg shadow-md">
             <h3 className="text-xl font-semibold text-zinc-800">Availability for <span className="text-blue-500">{selectedUser}</span></h3>
             <ul className="mt-2">
            {Object.entries(availability).map(([day, details]) => (
              <li key={day} className=" bg--400 flex items-center mb-4 ">
                <p className="capitalize text-[#476788] font-semibold w-32 bg--400  ">{day}</p>
                {details.isAvailable
                  ? `${details.startTime} - ${details.endTime}`
                  : "Not Available"}
              </li>
            ))}
          </ul>
        </div>
      )}
            </div>
      </div>
     
    </div>
  );
};

export default AllUser;
