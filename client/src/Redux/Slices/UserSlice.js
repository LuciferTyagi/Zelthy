import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  availability: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
    },
    setReduxAvailability: (state, action) => {
      state.availability = action.payload;
    },
  },
});

export const { setUser, setReduxAvailability } = userSlice.actions;
export default userSlice.reducer;
