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
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

export default All_Pages;
