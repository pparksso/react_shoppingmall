import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    value: {
      num: 1,
    },
  },
  reducers: {
    goPage: (state, action) => {
      state.value = action.payload;
    },
  },
});
const loginSlice = createSlice({
  name: "login",
  initialState: false,
  reducers: {
    loginSuccess: (state, action) => {
      state = action.payload;
    },
  },
});

export const { goPage } = pageSlice.actions;
export default pageSlice.reducer;
