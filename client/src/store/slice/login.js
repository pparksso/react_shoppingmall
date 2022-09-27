import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    value: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loginSuccess } = loginSlice.actions;
export default loginSlice.reducer;
