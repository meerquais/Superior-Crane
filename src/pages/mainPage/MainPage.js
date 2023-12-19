import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Router from "../../route/route";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  // const navigate = useNavigate();

  return (
    <>
        <div className="mobile-Msg" >
          <h1 className="msg">Please!<br/>Use Desktop, Laptop or PC to see the dashboard</h1>
        </div>
        <div className="parent-div-dashboard">
          <Header
            headerStyle={"header-style"}
            Name={"Name"}
            userAvatarstyle={"user-avatr-styling"}
            userProfileStyle={"userName-style"}
            updownStyle={"icons-style"}
            webLogoStyle={"logo-styling"}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <div>
              <SideBar
                sideBarStyling={"sidebar-parent"}
                tagdiv={"text-style"}
              />
            </div>
            <div
              style={{
                width: "100%",
                marginLeft: "1rem",
              }}
            >
              <Router />
            </div>
          </div>
        </div>
   </>
  );
};

export default MainPage;
