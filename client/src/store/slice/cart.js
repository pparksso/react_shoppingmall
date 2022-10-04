import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const asyncDelFetch = createAsyncThunk("cartSlice/asyncDelFetch", async (no) => {
  const del = await axios.get({});
});

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    value: {
      num: null,
    },
  },
  extraReducers: (builder) => {
    builder.addCase();
  },
});

// export const { goPage, resetPage } = pageSlice.actions;
export default cartSlice.reducer;
