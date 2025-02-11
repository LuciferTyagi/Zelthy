import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUserProfile } from "../Redux/Slices/UserSlice";

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

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>

      <div className="profile-picture">
        {profilePicture ? (
          <img 
            src={profilePicture.startsWith("http") ? profilePicture : `http://localhost:8000${profilePicture}`} 
            alt="Profile" 
            width={100} 
          />
        ) : (
          <div className="placeholder">{username ? username[0].toUpperCase() : "U"}</div>
        )}
      </div>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={uploadProfilePicture}>Upload Profile Picture</button>
    </div>
);

};

export default EditProfile;
