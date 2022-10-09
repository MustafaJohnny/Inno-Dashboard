import React from "react";
import LoadingSpinner from "../UI-Components/LoadingSpinner";
import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense } from "react";

const Login_page = React.lazy(() => import("./LoginPage"));
const Home_page = React.lazy(() => import("./HomePage"));

const All_Pages = () => {
  document.getElementsByTagName("META")[3].content = "";

  return (
    <React.Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login_page />} />
          <Route path="/home" element={<Home_page />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

export default All_Pages;
