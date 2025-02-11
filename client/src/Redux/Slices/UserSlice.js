import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { defaultAvailability } from "../../Components/AvailablityPage/Constant";
export const fetchUserProfile = createAsyncThunk("user/fetchUserProfile", async () => {
  const response = await axios.get("http://localhost:8000/api/user/me", {
    headers: { Authorization: localStorage.getItem("token") },
  });
  return response.data;
});
export const fetchAvailability = createAsyncThunk(
  "user/fetchAvailability",
  async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/availability/myAvailability", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      
      return {
        availability: response.data.availability || defaultAvailability,
        timezone: response.data.timezone || "Asia/Kolkata",
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch availability");
    }
  }
);
const initialState = {
  username: "",
  profilePicture: "",
  availability: defaultAvailability,
  timezone: "Asia/Kolkata",
  status: "idle", 
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    updateAvailability: (state, action) => {
      const { day, newAvailability } = action.payload;
      state.availability[day] = newAvailability;
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload;
    },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.username = action.payload.username;
        state.profilePicture = action.payload.profilePicture;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAvailability.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.availability = action.payload.availability ;
        state.timezone = action.payload.timezone;
      })
      .addCase(fetchAvailability.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
     

  },
});

export const { setUser, setProfilePicture , updateAvailability , setTimezone  } = userSlice.actions;
export default userSlice.reducer;
