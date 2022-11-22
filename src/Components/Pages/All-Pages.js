import React from "react";
import LoadingSpinner from "../UI-Components/LoadingSpinner";
import { Suspense } from "react";
import { useSelector } from 'react-redux';
import AuthPages from './AuthPages';
import UnAuthPages from './UnAuthPages';

const All_Pages = () => {
  const isAuth = useSelector((state) => state.controler.isAuth);
  document.getElementsByTagName("META")[3].content = "";
  
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        {isAuth ? <AuthPages/> : <UnAuthPages/>}
      </Suspense>
    </React.Fragment>
  );
};

export default All_Pages;
