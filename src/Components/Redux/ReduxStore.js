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
  user_Items: [],
  user_services: [],
  user_menus: [],
  user_QR_Codes: [],
  user_current_item: [],
  user_waitor_data: [],
  user_QR_big_img: "",
  user_menu_ID: "",
  user_service_ID: "",
  user_category_ID: "",
  user_QR_ID: "",
  user_item_ID: "",
  user_first_language: "",
  user_logo_text: "",
  user_currency: "",
  user_domain: "",
  user_logo: "",
  user_garson_notifi: "",
  user_order_notifi: "",
  user_service_notifi: "",
  user_basket_menu_status: "",
  user_garson_call_status: "",
  /* Old Values */
  user_table_QR_descrip_value: "",
  item_current_ID: "",
  item_name_value: "",
  item_desc_value: "",
  item_price_value: "",
  item_img_value: "",
  /* App Toggling States */
  show_add_service_items: false,
  show_add_categories: false,
  show_add_restaurant: false,
  show_add_item: false,
  show_add_service: false,
  show_add_menu: false,
  show_add_table_QR: false,
  show_add_tables: false,
  show_modal_QR_Img: false,
  show_change_client_name: false,
  show_change_item_name: false,
  show_change_item_desc: false,
  show_change_item_price: false,
  show_change_item_img: false,
  /* The App States */
  active_section_heading: "Менеджмент",
  restaurant_page_heading: "",
  services_page_heading: "",
  categories_page_heading: "",
  items_page_heading: "",
  current_item_page_heading: "",
  serverAPI: "inme.su",
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
      state.user_garson_call_status = action.payload.garson_call;
      state.user_basket_menu_status = action.payload.menu_order;
      state.user_first_language = action.payload.first_language;
      state.user_logo_text = action.payload.owner_name;
      state.user_restaurants = action.payload.rest;
      state.user_services = action.payload.service;
      state.user_currency = action.payload.money;
      state.user_domain = action.payload.domain;
      state.user_logo = action.payload.logo;
      state.all_data = action.payload;
    },

    getUserNotificationStates(state, action) {
      state.user_garson_notifi = action.payload.garson;
      state.user_order_notifi = action.payload.order;
      state.user_service_notifi = action.payload.uslugi;
    },

    getUserWaiterData(state, action) {
      state.user_waitor_data = action.payload;
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

    getUserItems(state, action) {
      state.user_Items = action.payload;
    },

    getUserServiceItems(state, action) {
      state.user_service_items = action.payload;
    },

    getUserQRCodes(state, action) {
      state.user_QR_Codes = action.payload;
    },

    getUserMenuID(state, action) {
      state.user_menu_ID = action.payload;
    },

    getUserCategoryID(state, action) {
      state.user_category_ID = action.payload;
    },

    getUserItemID(state, action) {
      state.user_item_ID = action.payload;
    },

    getUserServiceID(state, action) {
      state.user_service_ID = action.payload;
    },

    getUserIdQR(state, action) {
      state.user_QR_ID = action.payload;
    },

    getUserBigImgQR(state, action) {
      state.user_QR_big_img = action.payload;
    },

    getUserCurrentItem(state, action) {
      state.user_current_item = action.payload;
    },

    /* controling the app functions */
    setRestaurantPageHeading(state, action) {
      state.restaurant_page_heading = action.payload;
    },

    setCategoriesPageHeading(state, action) {
      state.categories_page_heading = action.payload;
    },

    setItemsPageHeading(state, action) {
      state.items_page_heading = action.payload;
    },

    setCurrentItemPageHeading(state, action) {
      state.current_item_page_heading = action.payload;
    },

    setServicesPageHeading(state, action) {
      state.services_page_heading = action.payload;
    },

    setTableDescriptionValue(state, action) {
      state.user_table_QR_descrip_value = action.payload;
    },

    setItemNameValue(state, action) {
      state.item_name_value = action.payload;
    },

    setItemDescValue(state, action) {
      state.item_desc_value = action.payload;
    },

    setItemPriceValue(state, action) {
      state.item_price_value = action.payload;
    },

    setItemImgValue(state, action) {
      state.item_img_value = action.payload;
    },

    setCurrentItemID(state, action) {
      state.item_current_ID = action.payload;
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

    toggleAddItem(state) {
      state.show_add_item = !state.show_add_item;
    },

    toggleAddTableQR(state) {
      state.show_add_table_QR = !state.show_add_table_QR;
    },

    toggleAddTables(state) {
      state.show_add_tables = !state.show_add_tables;
    },

    toggleModalImgQR(state) {
      state.show_modal_QR_Img = !state.show_modal_QR_Img;
    },

    toggleShowAddServiceItems(state) {
      state.show_add_service_items = !state.show_add_service_items;
    },

    toggleChangeClientName(state) {
      state.show_change_client_name = !state.show_change_client_name;
    },

    toggleChangeItemName(state) {
      state.show_change_item_name = !state.show_change_item_name;
    },

    toggleChangeItemDesc(state) {
      state.show_change_item_desc = !state.show_change_item_desc;
    },

    toggleChangeItemPrice(state) {
      state.show_change_item_price = !state.show_change_item_price;
    },

    toggleChangeItemImg(state) {
      state.show_change_item_img = !state.show_change_item_img;
    },
  },
});

export const controlerReducer = controlSlice.reducer;
export const controlActions = controlSlice.actions;
