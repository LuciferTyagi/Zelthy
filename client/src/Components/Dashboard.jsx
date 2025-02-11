import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../Redux/Slices/UserSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { username, profilePicture, status } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUserProfile());
        console.log("Effect triggered2");
    }, [dispatch]);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error fetching profile</p>;
    const profileImageSrc = profilePicture.startsWith("http")
  ? profilePicture
  : `http://localhost:8000${profilePicture}`;
    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <div className="profile-picture">
                <img src={profileImageSrc} alt="Profile" width={100} />
            </div>
            <p><strong>Name:</strong> {username}</p>
        </div>
    );
};

export default Dashboard;
