import { createSlice } from "@reduxjs/toolkit";
import { RESET_STORE } from '../actions';

const initialState = {};
export const ArriveSlice = createSlice({
  name: "arrive",
  initialState: {
    isLoading: false,
    mailArrives: [],
  },
  reducers: {
    ArriveList: (state, { payload }) => {
      state.mailArrives = payload;
    },
    AddNewMailArrive: (state, { payload }) => {
      state.mailArrives.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_STORE, () => initialState); // Reset to initial state
  },
});

export const { ArriveList, AddNewMailArrive } = ArriveSlice.actions;
export default ArriveSlice.reducer;