import { createSlice } from "@reduxjs/toolkit";
import { RESET_STORE } from '../actions';

const initialState = {};

export const DepartSlice = createSlice({
  name: "depart",
  initialState: {
    isLoading: false,
    mailDeparts: [],
  },
  reducers: {
    DepartList: (state, { payload }) => {
      state.mailDeparts = payload;
    },
    AddNewMailDepart: (state, { payload }) => {
      state.mailDeparts.push(payload);
    },
  },
   extraReducers: (builder) => {
      builder.addCase(RESET_STORE, () => initialState); // Reset to initial state
    },
});

export const { DepartList, AddNewMailDepart } = DepartSlice.actions;
export default DepartSlice.reducer;