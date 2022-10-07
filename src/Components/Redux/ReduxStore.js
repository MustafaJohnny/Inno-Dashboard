import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {},
});

export const controlerReducer = controlSlice.reducer;
export const controlActions = controlSlice.actions;
