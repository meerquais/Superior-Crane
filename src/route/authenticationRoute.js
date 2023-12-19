import { Routes, Route,Navigate } from "react-router-dom";
import React from "react";
import Login from "../pages/login/Login";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import OtpSend from "../pages/otpsend/OtpSend";
import OptVerify from "../pages/otpverify/OptVerify";

const AuthenticationRoute = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sendotp" element={<OtpSend/>} />
        <Route path="/verify-otp" element={<OptVerify/>} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </React.Fragment>
  );
};

export default AuthenticationRoute;
