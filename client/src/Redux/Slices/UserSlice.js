import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { defaultAvailability } from "../../Components/AvailablityPage/Constant";
import {BASE_URL} from "../../Utils/Constant"

export const fetchUserProfile = createAsyncThunk("user/fetchUserProfile", async () => {
  const response = await axios.get(`${BASE_URL}/api/user/me`, {
    headers: { Authorization: localStorage.getItem("token") },
  });
  return response.data;
});
export const fetchAvailability = createAsyncThunk(
  "user/fetchAvailability",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/availability/myAvailability`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      
      return {
        availability: response?.data?.availability || defaultAvailability,
        timezone: response?.data?.timezone || "Asia/Kolkata",
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch availability");
    }
  }
);

export const fetchDailyAvailability = createAsyncThunk("user/fetchDailyAvailability", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const userId = state.user.userId; 
    if (!userId) throw new Error("User ID is missing");

    const response = await axios.get(`${BASE_URL}/api/daily-Availability/${userId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return response.data || {}; 
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch daily availability");
  }
});
const initialState = {
  userId:null,
  username: "",
  profilePicture: "",
  availability: defaultAvailability,
  dailyAvailability: [],
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
    setDailyAvailability: (state, action) => {
      const { date, availability } = action.payload;
      state.dailyAvailability[date] = availability;
    },
    removeDailyAvailability: (state, action) => {
      state.dailyAvailability = state.dailyAvailability.filter(item => item._id !== action.payload);
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
        state.userId = action.payload._id;
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

      .addCase(fetchDailyAvailability.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDailyAvailability.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dailyAvailability = action.payload; 
      })
      .addCase(fetchDailyAvailability.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
     

  },
});

export const { setUser, setProfilePicture , updateAvailability ,setDailyAvailability ,setTimezone,removeDailyAvailability  } = userSlice.actions;
export default userSlice.reducer;
