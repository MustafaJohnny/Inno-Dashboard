import React from "react";
import LoadingSpinner from "../UI-Components/LoadingSpinner";
import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense } from "react";

const Login_Page = React.lazy(() => import("./LoginPage"));
const Home_Page = React.lazy(() => import("./HomePage"));
const Menus_Page = React.lazy(() => import("./MenusPage"));
const Items_Page = React.lazy(() => import("./ItemsPage"));
const Categories_Page = React.lazy(() => import("./CategoriesPage"));
const Services_Page = React.lazy(() => import("./ServicesPage"));
const Settings_Page = React.lazy(() => import("./SettingsPage"));
const QR_Page = React.lazy(() => import("./QRcodesPage"));
const Clicked_Item = React.lazy(() => import("./CurrentItemPage"));
const Waiter_Page = React.lazy(() => import("./WaiterPage"));
const Orders_Servics_Page = React.lazy(() => import("./OrderServicePage"));
const Orders_Page = React.lazy(() => import("./OrdersPage"));
const Design_Menu_Page = React.lazy(() => import("./DesignMenuPage"));

const All_Pages = () => {
  document.getElementsByTagName("META")[3].content = "";

  return (
    <React.Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login_Page />} />
          <Route path="/home" element={<Home_Page />} />
          <Route path="/menus" element={<Menus_Page />} />
          <Route path="/categories" element={<Categories_Page />} />
          <Route path="/Items" element={<Items_Page />} />
          <Route path="/services" element={<Services_Page />} />
          <Route path="/settings" element={<Settings_Page />} />
          <Route path="/qr" element={<QR_Page />} />
          <Route path="/currentItem" element={<Clicked_Item />} />
          <Route path="/waiter" element={<Waiter_Page />} />
          <Route path="/ordersService" element={<Orders_Servics_Page />} />
          <Route path="/orders" element={<Orders_Page />} />
          <Route path="/design-menu" element={<Design_Menu_Page />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

export default All_Pages;
