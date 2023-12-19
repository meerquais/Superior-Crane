import React, { useEffect, useState } from "react";
import Select from "react-select";
import { optionList } from "../utils/dummyData";
import { useDispatch, useSelector } from "react-redux";
import { filterJobByParam, getJobByweek, getJobData } from "../redux/actions/DashBoardActions";
import { jobParams } from "../redux/actions/UserAction";
import './../pages/jobLists/Joblist.css';
import CustomButton from "./CustomButton";
import PrimaryBtn from "./PrimaryBtn";
import ReactLoading from "react-loading";
import { convertTodayDate } from "../utils/HelpingFuntions";


const JobFilterCard = ({ mainContiner, dropDownStyling }) => {
  const [data, setData] = useState({});
  const jobData = useSelector((state) => state?.dashBoard);
  const dispatch = useDispatch();
  const newData = jobData?.job?.jobsInWeek?.map((v) => ({
    value: v.clientName,
    label: v.clientName,
  }));
  const newAdress = jobData?.job?.jobsInWeek?.map((v) => ({
    value: v.address,
    label: v.address,
  }));
  const uniqueName = newData?.filter((obj, index) => {
    return index === newData?.findIndex((o) => obj.value === o.value);
  });
  const uniqueAdress = newAdress?.filter((obj, index) => {
    return index === newAdress?.findIndex((o) => obj.value === o.value);
  });
  var todaysDate = new Date();
  const getDate = convertTodayDate(todaysDate);

  useEffect(() => {
    dispatch(getJobByweek(getDate));
  }, []);

  return (
    <>
       <div className="main-card">
      <div className="mini-card">
        <div className="sub-container">
          <span className="title">{'Clien Name'}</span>
          <Select
            className={"dropDownStyling"}
            options={uniqueName}
            onChange={(e)=>{
              setData({ ...data, "client": e?.label });
              dispatch(jobParams({ ...data, "client": e?.label }))
            }}
            placeholder={
              data.client == "" ? "Search Name" : data.client
            }
             />
        </div>
        <div className="sub-container">
          <span className="title">{"Address"}</span>
          <Select
            className={"dropDownStyling"}
            options={uniqueAdress}
            onChange={(e)=>{
              setData({ ...data, "address": e?.label });
              dispatch(jobParams({ ...data, "address": e?.label }))

            }}        
            placeholder={data.address == "" ? "Search Address" : data.address}
         
          />
        </div>
        <div className="sub-container">
          <span className="title">{"Date"}</span>
          <input
             onChange={(e)=>{
              setData({ ...data, "jobDate": e.target.value });
              dispatch(jobParams({ ...data, "jobDate": e.target.value }))
            }} 
            type={"date"}
        
       className={"dateStyling"}
          />
        </div>
      </div>
      <div className="btn-container">
        <div  style={{
            display: "flex",
          }}>
          <CustomButton
            title={
              jobData?.isLoading ? (
                <>
                  <div style={{ marginLeft: "3.4rem" }}>
                    <ReactLoading
                      type="bars"
                      color={"white"}
                      height={50}
                      width={35}
                      delay={4}
                    />
                  </div>
                </>
              ) : (
                "Filter"?.toLocaleUpperCase()
              )
            }
            buttonStyle={"btn-filter-style"}
            onclick={() => {
              if (
                data?.client != "" ||
                data?.address != "" ||
                data?.jobDate != ""
              ) {
                dispatch(filterJobByParam(data));
              } else {
                alert("Select any of the type!");
              }
            }}
          />
          {data.client ||
          data.address ||
          data.jobDate != undefined ? (
            <div
              style={{
                marginLeft: 3,
              }}
            >
              <PrimaryBtn
                width={120}
                height={40}
                title={"Reset Filter"}
                onclick={() => {
                  dispatch(getJobByweek(getDate));
                  window?.location?.reload();
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
    </>
  );
};

export default JobFilterCard;
