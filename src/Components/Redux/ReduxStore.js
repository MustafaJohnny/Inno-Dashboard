import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_email: "",
  user_password: "",
  user_name: "",
  user_role: "",
  user_phone_number: "",
  user_register_date: "",
  user_last_seen_date: "",
};

const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    getUserEmail(state, action) {
      state.user_email = action.payload;
    },

    getUserPassword(state, action) {
      state.user_password = action.payload;
    },

    getUserDataFromServer(state, action) {
      state.user_name = action.payload.name;
      state.user_role = action.payload.role;
      state.user_phone_number = action.payload.tel;
      state.user_register_date = action.payload.date_reg;
      state.user_last_seen_date = action.payload.last_time;
    },
  },
});

export const controlerReducer = controlSlice.reducer;
export const controlActions = controlSlice.actions;
