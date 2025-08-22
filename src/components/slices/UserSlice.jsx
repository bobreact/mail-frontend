import { createSlice } from "@reduxjs/toolkit";
import { RESET_STORE } from "../actions";


const initialState = {};
export const UserSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: "",
  },
  reducers: {
    User: (state, { payload }) => {
          state.user = payload;
        },
        AddUser: (state, { payload }) => {
      state.user.push(payload);
    },
  },
   extraReducers: (builder) => {
      builder.addCase(RESET_STORE, () => initialState); // Reset to initial state
    },
});

export const { AddUser, User } = UserSlice.actions;
export default UserSlice.reducer;