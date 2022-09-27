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
    mainPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { goPage, mainPage } = pageSlice.actions;
export default pageSlice.reducer;
