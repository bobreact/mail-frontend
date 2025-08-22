import { createSlice } from "@reduxjs/toolkit";
import { RESET_STORE } from "../actions";


const initialState = {};
export const StructureSlice = createSlice({
  name: "structure",
  initialState: {
    isLoading: false,
    structure: "",
  },
  reducers: {
    Structure: (state, { payload }) => {
      state.structure = payload;
    },
        AddStructure: (state, { payload }) => {
      state.structure.push(payload);
    },
  },
   extraReducers: (builder) => {
      builder.addCase(RESET_STORE, () => initialState); // Reset to initial state
    },
});

export const { Structure, AddStructure } = StructureSlice.actions;
export default StructureSlice.reducer;