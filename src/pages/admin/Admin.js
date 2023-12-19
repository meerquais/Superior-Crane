import React, { useState, useEffect } from "react";
import JoblistCard from "../../components/JobListCard";
import UserTable from "../../components/UserTable";
import "./Admin.css";
import { useDispatch } from "react-redux";
import { getWebUser } from "../../redux/actions/UserAction";

const Admin = () => {
  const dispatch = useDispatch();
return (
    <div className="main-admin">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>ADMIN</h3>
        <span
          onClick={() => {
            dispatch(getWebUser("Admin"));
          }}
          style={{
            fontSize: "1.5rem",
            marginRight: "2.3rem",
            cursor: "pointer",
          }}
        >
          &#128260;
        </span>
      </div>
      <div className="container">
        <div className="sec-Container">
          <JoblistCard />
        </div>
        <UserTable
          Serial={"Serial#"}
          Name={"Admin Name"}
          Email={"Email Address"}
        />
      </div>
    </div>
  );
};

export default Admin;
