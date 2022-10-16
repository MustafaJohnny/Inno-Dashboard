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
  user_service_items: [],
  user_restaurants: [],
  user_categories: [],
  user_services: [],
  user_menus: [],
  user_menu_ID: "",
  user_service_ID: "",
  user_category_ID: "",
  user_logo_text: "",
  user_currency: "",
  user_domain: "",
  user_logo: "",
  /* App Toggling States */
  show_add_service_items: false,
  show_add_categories: false,
  show_add_restaurant: false,
  show_add_service: false,
  show_add_menu: false,
  /* The App States */
  up_navigation_heading: "Менеджмент",
  restaurant_page_heading: "",
  services_page_heading: "",
  categories_page_heading: "",
  serverAPI: "innomenu.ru",
  app_languages: [],
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

    getAppLanguages(state, action) {
      state.app_languages = action.payload;
    },

    getUserMenus(state, action) {
      state.user_menus = action.payload;
    },

    getUserCategories(state, action) {
      state.user_categories = action.payload;
    },

    getUserServiceItems(state, action) {
      state.user_service_items = action.payload;
    },

    getUserMenuID(state, action) {
      state.user_menu_ID = action.payload;
    },

    getUserCategoryID(state, action) {
      state.user_category_ID = action.payload;
    },

    getUserServiceID(state, action) {
      state.user_service_ID = action.payload;
    },

    /* controling the app functions */
    setUpNavHeading(state, action) {
      state.up_navigation_heading = action.payload;
    },

    setRestaurantPageHeading(state, action) {
      state.restaurant_page_heading = action.payload;
    },

    setCategoriesPageHeading(state, action) {
      state.categories_page_heading = action.payload;
    },

    setServicesPageHeading(state, action) {
      state.services_page_heading = action.payload;
    },

    /* toggling app functions */
    toggleAddRestaurant(state) {
      state.show_add_restaurant = !state.show_add_restaurant;
    },

    toggleAddService(state) {
      state.show_add_service = !state.show_add_service;
    },

    toggleAddMenu(state) {
      state.show_add_menu = !state.show_add_menu;
    },

    toggleAddCategories(state) {
      state.show_add_categories = !state.show_add_categories;
    },

    toggleShowAddServiceItems(state) {
      state.show_add_service_items = !state.show_add_service_items;
    },
  },
});

export const controlerReducer = controlSlice.reducer;
export const controlActions = controlSlice.actions;
