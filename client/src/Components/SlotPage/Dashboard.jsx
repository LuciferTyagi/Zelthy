import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Redux/Slices/UserSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Dashboard = ({setTabSelected }) => {
    const dispatch = useDispatch();
    const { username, profilePicture ,timezone , availability } = useSelector((state) => state.user);
    
    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const profileImageSrc = profilePicture.startsWith("http") ? profilePicture : `http://localhost:8000${profilePicture}`;

    return (
        <div className="Dashboard-Wrapper w-full h-full bg--300">
            <h1 className="text-3xl md:text-5xl text-blue-500 font-bold dark:text-white">Dashboard</h1>
            <p className="text-base md:text-lg text-zinc-500 font-medium mt-2 md:mt-4 dark:text-[#B0B0B0]">Welcome to your Dashboard! Manage your profile, update availability, and stay organized—all in one place</p>
            <div className="w-full bg--300 flex flex-col md:flex-row items-center  gap-10 py-10 md:py-20">
                 <div className="User-Profile-Card size-[275px] flex justify-end pt-[100px]">
                     <div className="relative bg-blue-500 dark:bg-[#1E1E1E] rounded-xl w-full h-full flex flex-col gap-4 justify-center items-start px-2 ">
                          <div className="Image-container absolute rounded-full size-32 overflow-hidden bg-white bottom-[70%] left-1/2 transform -translate-x-1/2 border border-black/20">
                                <img src={profileImageSrc} alt="user-image"className=""/>
                          </div>
                          <h2 className="User-Name capitalize text-white text-lg font-semibold mt-4">{username}</h2>
                          <button onClick={() => setTabSelected("Availability")} className="border border-white text-white rounded-full px-3 py-1 flex items-center gap-2">{timezone}<FontAwesomeIcon icon={faArrowRight} className=""/></button>
                          
                     </div>

                 </div>


                 <div className="Availablity-User h-fit grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                 {Object.entries(availability).map(([day, { isAvailable, startTime, endTime }]) => (
                      <div key={day} className={`h-auto rounded-md flex flex-col items-center p-2 ${isAvailable ? "bg-green-200 cursor-pointer" : "bg-red-100 cursor-not-allowed opacity-60"}`}>
                       <p className="text-base text-blue-500 font-semibold capitalize">{day}</p>
                       {isAvailable ? ( <p className="text-sm text-zinc-500 mt-2">{`${startTime} - ${endTime}`}</p>) : (<p className="text-sm mt-2 text-zinc-500">Unavailable</p>)}
                     </div>
                  ))}
                  <button onClick={() => setTabSelected("Availability")} className="bg-[#006BFF] dark:bg-white dark:text-black text-white rounded-md font-medium">Availability</button>
                 </div>
            </div>
        </div>
    );
};

export default Dashboard;
