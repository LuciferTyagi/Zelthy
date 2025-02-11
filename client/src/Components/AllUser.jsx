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
      .then((response) => {
        setUsers((prevUsers) => {
          // Prevent re-setting the same data (avoid unnecessary re-renders)
          return JSON.stringify(prevUsers) === JSON.stringify(response.data) ? prevUsers : response.data;
        });
      })
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
      
      <div style={{boxShadow:" rgba(0, 0, 0, 0.24) 0px 3px 8px"}} className="rounded-lg py-20 px-5 md:px-10 bg-white flex flex-col gap-10  mt-6">
            <div className="User-Profiles ">
            <ul className="flex flex-wrap gap-4  justify-evenly">
               {users.length > 0 ? (
                users.map((user) => (
                   <li key={user._id} className=" mb-4 cursor-pointer text-zinc-400 hover:text-zinc-700 font-medium  flex flex-col items-center gap-3" onClick={() => fetchAvailability(user._id, user.username)}>
                     <div className="size-16 bg-red-400 rounded-full"></div>
                      <p className="capitalize">{user.username}</p>
                   </li>
                 ))
               ) : (
                <p>No users found</p>
                   )}
              </ul>
            </div>

            <div className="User-Availablity">
            {availability && (
            <div className="relative p-2 md:p-4 border rounded-lg shadow-md">
             <h3 className="text-base md:text-xl font-semibold text-zinc-800">Availability for <span className="text-blue-500">{selectedUser}</span></h3>
             
             <div className="h-[1px] w-full bg-black/20 my-2"/>
             <ul className="">
            {Object.entries(availability).map(([day, details]) => (
              <li key={day} className=" bg--400 flex items-center mb-4 ">
                <p className="capitalize text-blue-500 font-semibold w-24 md:w-32  text-sm md:text-base ">{day}</p>
                <p className="text-sm md:text-base text-zinc-500">{details.isAvailable
                  ? `${details.startTime} - ${details.endTime}`
                  : "Unavailable"}</p>
              </li>
            ))}
             </ul>
             <p>{timeZone}</p>
             <div className="absolute size-20 bg-red-400 rounded-full top-1/3 right-4"/>
        </div>
      )}
            </div>
      </div>
     
    </div>
  );
};

export default AllUser;
