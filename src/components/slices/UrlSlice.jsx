import { createSlice } from "@reduxjs/toolkit";
import { RESET_STORE } from "../actions";

const initialState = {};
export const UrlSlice = createSlice({
  name: "url",
  initialState: {
    isLoading: false,
    url: "",
  },
  reducers: {
    Url: (state, { payload }) => {
      state.url = payload;
    },
  },
   extraReducers: (builder) => {
      builder.addCase(RESET_STORE, () => initialState); // Reset to initial state
    },
});

export const { Url } = UrlSlice.actions;
export default UrlSlice.reducer;