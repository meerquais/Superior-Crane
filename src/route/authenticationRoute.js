import { Routes, Route,Navigate } from "react-router-dom";
import React from "react";
import Login from "../pages/login/Login";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import PageNotFound from "../pages/pageNotFound/pageNotFound";

const AuthenticationRoute = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </React.Fragment>
  );
};

export default AuthenticationRoute;
