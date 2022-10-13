import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /* User Login States */
  user_email: "",
  user_password: "",
  /* User Account States */
  user_name: "",
  user_role: "",
  user_phone_number: "",
  user_register_date: "",
  user_last_seen_date: "",
  /* Owner Product States */
  user_restaurants: [],
  user_services: [],
  user_logo_text: "",
  user_currency: "",
  user_domain: "",
  user_logo: "",
  /* App Toggling States */
  show_add_restaurant: false,
  show_add_service: false,
  serverAPI: "innomenu.ru",
};

const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    /* user login functions */
    getUserEmail(state, action) {
      state.user_email = action.payload;
    },

    getUserPassword(state, action) {
      state.user_password = action.payload;
    },

    /* user account functions */
    getUserDataFromServer(state, action) {
      state.user_name = action.payload.name;
      state.user_role = action.payload.role;
      state.user_phone_number = action.payload.tel;
      state.user_register_date = action.payload.date_reg;
      state.user_last_seen_date = action.payload.last_time;
    },

    /* owner product function */
    getUserDataAfterLogin(state, action) {
      state.user_logo = action.payload.logo;
      state.user_logo_text = action.payload.owner_name;
      state.user_currency = action.payload.money;
      state.user_restaurants = action.payload.rest;
      state.user_services = action.payload.service;
      state.user_domain = action.payload.domain;
      state.all_data = action.payload;
    },

    /* toggling app functions */
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
