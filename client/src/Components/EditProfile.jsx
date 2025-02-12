import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUserProfile } from "../Redux/Slices/UserSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { username, profilePicture } = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState(null);


  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadProfilePicture = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      await axios.put(
        "http://localhost:8000/api/user/uploadProfilePicture",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Re-fetch user profile to update Redux store with new profile picture
      dispatch(fetchUserProfile());

      alert("Profile picture updated!");
    } catch (error) {
      console.error("Error uploading profile picture", error);
    }
  };
  const profileImageSrc = profilePicture.startsWith("http") ? profilePicture : `http://localhost:8000${profilePicture}`;

  return (
    <div className="Edit-Profile-Container w-full h-full">
      <h2 className="text-3xl md:text-5xl text-blue-500  font-bold dark:text-white">Edit Profile</h2>
      <p className="text-basse md:text-lg text-zinc-500 font-medium mt-2 md:mt-4 dark:text-[#B0B0B0]">Customize your profile to reflect the best version of yourself—update details, add a profile picture, and make it truly yours!</p>
      <div className="Image-Upload-Container w-full flex justify-center items-center py-20">
            <div className="relative size-[275px] bg-[#066BFF] dark:bg-[#1E1E1E] rounded-lg flex justify-center items-center">
            <div className=" Image-container absolute rounded-full size-32 overflow-hidden bg-white bottom-[70%] left-1/2 transform -translate-x-1/2 border border-black/20">
                  <img src={profileImageSrc} alt="user-image"className=""/>
            </div>
            <label className="absolute bg-white px-4 py-2 rounded-lg cursor-pointer shadow-md flex items-center gap-2 hover:bg-gray-200 transition">
                  <FontAwesomeIcon icon={faCamera} className="text-blue-500"/>Upload Image
                   <input type="file" accept="image/*" onChange={handleFileChange}  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
            </label>          
             <button onClick={uploadProfilePicture} className="absolute bottom-10 border rounded-md p-2 text-white font-semibold border-white">Upload Profile Picture</button> 
          </div>
      </div>

    </div>
);

};

export default EditProfile;
