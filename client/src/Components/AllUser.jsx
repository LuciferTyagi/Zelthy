import { useEffect, useState } from "react";
import axios from "axios";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [timeZone , setTimeZone] = useState("");
  
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
    .then((response) => {
      setAvailability(response.data.availability);
      setTimeZone(response.data.timezone);
      console.log(response)
    })
    .catch((error) => console.error("Error fetching availability:", error));
  };

  return (
    <div className="bg--200">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-500">Meet Our Community</h1>
      <p className=" text-sm md:text-lg text-zinc-500 font-medium mt-0.5 md:mt-2">Browse and see the availability of other users.</p>
      
      <div style={{boxShadow:" rgba(0, 0, 0, 0.24) 0px 3px 8px"}} className="rounded-lg py-20 px-5 md:px-10 bg-white flex flex-col gap-10  mt-4">
            <div className="User-Profiles-section  ">
            <ul className="flex flex-wrap gap-4  justify-evenly">
               {users.length > 0 ? (
                users.map((user) => (
                   <li key={user._id} className=" mb-4 cursor-pointer text-zinc-400 hover:text-zinc-700 font-medium  flex flex-col items-center gap-3" onClick={() => fetchAvailability(user._id, user.username)}>
                     <div className="size-16 bg-white border border-black/20 rounded-full"><img src={user.profilePicture.startsWith("http") ? user.profilePicture : `http://localhost:8000${user.profilePicture}`} alt="user" className=""/> </div>
                      <p className="capitalize">{user.username}</p>
                   </li>
                 ))
               ) : (
                <p className="text-base text-zinc-700 font-semibold">No users found</p>
                   )}
              </ul>
            </div>

            <div className="User-Availablity bg--400 grid grid-cols-3 gap-6">
            {availability && (
              <>
           {Object.entries(availability).map(([day, { isAvailable, startTime, endTime }]) => (
            <div key={day} className={`h-auto rounded-md flex flex-col items-center p-2 ${isAvailable ? "bg-green-100 cursor-pointer" : "bg-red-100 cursor-not-allowed opacity-60"}`}>
             <p className="text-base text-blue-500 font-semibold capitalize">{day}</p>
             {isAvailable ? ( <p className="text-sm text-zinc-500 mt-2">{`${startTime} - ${endTime}`}</p>) : (<p className="text-sm mt-2 text-zinc-500">Unavailable</p>)}
           </div>
        ))}
        </>
      )}
            </div>
      </div>
     
    </div>
  );
};

export default AllUser;
