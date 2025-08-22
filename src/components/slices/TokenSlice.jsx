import { createSlice } from "@reduxjs/toolkit";
import { RESET_STORE } from "../actions";

const initialState = {};
export const TokenSlice = createSlice({
  name: "token",
  initialState: {
    isLoading: false,
    token: "",
  },
  reducers: {
    Token: (state, { payload }) => {
      state.token = payload;
    },
        AddToken: (state, { payload }) => {
      state.token.push(payload);
    },
  },
   extraReducers: (builder) => {
      builder.addCase(RESET_STORE, () => initialState); // Reset to initial state
    },
});

export const { Token, TokenAddToken } = TokenSlice.actions;
export default TokenSlice.reducer;