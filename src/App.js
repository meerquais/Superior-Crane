import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter } from "react-router-dom";

import MainPage from "./pages/mainPage/MainPage";
import AuthenticationRoute from "./route/authenticationRoute";
import { useDispatch, useSelector } from "react-redux";
import { convertTodayDate } from "./utils/HelpingFuntions";
import { getJobByweek, getJobData } from "./redux/actions/DashBoardActions";

function App() {
  const userID = useSelector((state) => state?.auth?.userDetail);
  const items = JSON.parse(localStorage.getItem("items"));
  const dispatch = useDispatch();
  var todaysDate = new Date();
  const getDate = convertTodayDate(todaysDate);
  useEffect(() => {
    dispatch(getJobByweek(getDate));
  }, [])
  
  return (
    <React.Fragment>
      <BrowserRouter>
        {!items?.userId ? (
          <AuthenticationRoute />
        ) : (
          <MainPage />
        )}
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;

//-> The web contains a very basic structure with almost custom work no ideal packagege is added in it for some reasons
//-> The Styling totally on css
//-> Redux & Thunk used for state managment
//-> For Each section redux created seperately
//-> Addition in rootlevel Root-Level   
//-> LocalStorage is conatin data every time
//-> Mostly works is Customized
//-> All state is in working Stage
//-> Used Clearly light Functions