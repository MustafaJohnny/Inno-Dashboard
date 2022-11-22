import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

const Login_Page = React.lazy(() => import("./LoginPage"));

const UnAuthPages = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login_Page />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default UnAuthPages;