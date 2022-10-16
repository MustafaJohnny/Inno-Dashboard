import React from "react";
import LoadingSpinner from "../UI-Components/LoadingSpinner";
import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense } from "react";

const Login_Page = React.lazy(() => import("./LoginPage"));
const Home_Page = React.lazy(() => import("./HomePage"));
const Menus_Page = React.lazy(() => import("./MenusPage"));
const Services_Page = React.lazy(() => import("./ServicesPage"));

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
          <Route path="/services" element={<Services_Page />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

export default All_Pages;
