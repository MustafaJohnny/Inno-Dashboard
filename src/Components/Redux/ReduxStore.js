import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serverAPI: "innomenu.ru",
  user_email: "",
  user_password: "",
  user_name: "",
  user_role: "",
  user_phone_number: "",
  user_register_date: "",
  user_last_seen_date: "",
  user_logo: "",
  user_logo_text: "",
  user_restaurants: [],
  user_services: [],
  user_currency: "",
  user_domain: "",
  show_add_restaurant: false,
  show_add_service: false,
  all_data: {},
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

    getUserDataAfterLogin(state, action) {
      state.user_logo = action.payload.logo;
      state.user_logo_text = action.payload.owner_name;
      state.user_currency = action.payload.money;
      state.user_restaurants = action.payload.rest;
      state.user_services = action.payload.service;
      state.user_domain = action.payload.domain;
      state.all_data = action.payload;
    },

    toggleAddRestaurant(state) {
      state.show_add_restaurant = !state.show_add_restaurant;
    },

    toggleAddService(state) {
      state.show_add_service = !state.show_add_service;
    },
  },
});

export const controlerReducer = controlSlice.reducer;
export const controlActions = controlSlice.actions;
