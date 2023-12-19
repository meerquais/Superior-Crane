import React, { useState, useEffect } from "react";
import { selectNumber } from "../utils/dummyData";
import { useDispatch, useSelector } from "react-redux";
import { getUsersDetail, searchChoices } from "../redux/actions/UserAction";
import PrimaryBtn from "./PrimaryBtn";

const JoblistCard = () => {
  const userData = useSelector((state) => state.usersData);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "99%",
      }}
    >
      <div
      style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }}
      >
        <span
          style={{
            opacity: 0.5,
            marginRight: 4,
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          Search:
        </span>
        <input
          style={{
            width: "15rem",
            height:"1rem",
            paddingLeft:'0.3rem',
            borderRadius:5
          }}
          onChange={(i) => {
            setSearch(i.target.value);
          }}
          placeholder="search..."
          type="text"
        />
        <PrimaryBtn
        stylbtn={{
          marginLeft:1
        }}
        title={"Go Now"}
        onclick={() => {
          dispatch(searchChoices(search, userData?.usersData));
        }}
        />
     
      </div>
    </div>
  );
};

export default JoblistCard;
