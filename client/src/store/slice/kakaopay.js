import { createSlice } from "@reduxjs/toolkit";

const kakaopaySlice = createSlice({
  name: "kakaopay",
  initialState: {
    tid: "",
    partner_user_id: "",
  },
  reducers: {
    approval: (state, action) => {
      state.tid = action.payload.tid;
      state.partner_user_id = action.payload.partner_user_id;
    },
  },
});

export const { approval } = kakaopaySlice.actions;
export default kakaopaySlice.reducer;
