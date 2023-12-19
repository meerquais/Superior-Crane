import { useDispatch, useSelector } from "react-redux";
import JobsCalender from "../../components/jobsCalender";
import "./DashBoard.css";
import React, { useState } from "react";
import {
  getJobByweek,
  getJobData,
  getNextWeekData,
} from "../../redux/actions/DashBoardActions";
import { convertTodayDate } from "../../utils/HelpingFuntions";
import { useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";
import { VscClearAll } from "react-icons/vsc";
import PrimaryBtn from "../../components/PrimaryBtn";

const DashBoard = () => {
  const [state, setState] = useState();
  var todaysDate = new Date();
  const getDate = convertTodayDate(todaysDate);
  const dispatch = useDispatch();
  const isLoader = useSelector((state) => state?.dashBoard?.isLoading);
  const allJobData = useSelector((state) => state?.dashBoard);
  const [selectedDate, setSelectedDate] = useState("");
  const [isHovering, setIsHovering] = useState({
    isRefresh: false,
    isReset: false,
  });

  useEffect(() => {
    setSelectedDate("");
    setState("Weekly");
    dispatch(getJobByweek(getDate));
  }, []);

  const handleMouseOver = (refresh) => {
    if (refresh === "Refresh") {
      setIsHovering({ isRefresh: true });
    } else {
      setIsHovering({ isReset: true });
    }
  };

  const handleMouseOut = (reset) => {
    if (reset === "Reset") {
      setIsHovering({ isRefresh: false });
    } else {
      setIsHovering({ isReset: false });
    }
  };
  // console.log(
  //   "allJobData?.ForwardWeekData?.date",
  //   allJobData?.ForwardWeekData?.date,
  //   allJobData?.job?.date
  // );
  return (
    <>
      <div className="heading-container">
        <h2>DASHBOARDS</h2>
        <div className="mainContiner">
          <div className="iconContainer">
            <input
              value={selectedDate}
              type="date"
              className="newDate"
              onChange={(e) => {
                setSelectedDate(e?.target?.value);
              }}
            />
            <PrimaryBtn
              width={110}
              height={30}
              title={"Search Job"}
              onclick={() => {
                dispatch(getJobByweek(selectedDate));
                setState("Weekly");
              }}
            />
            <span
              onClick={() => {
                setState("Weekly");
                dispatch(getJobByweek(!selectedDate ? getDate : selectedDate));
              }}
              className="Left"
              onMouseOver={() => {
                handleMouseOver("Refresh");
              }}
              onMouseOut={() => {
                handleMouseOut("Reset");
              }}
            >
              <FiRefreshCcw size={17} color="#DC2F2B" />
              {isHovering?.isRefresh && <span className="hover">Refresh</span>}
            </span>

            <span
              className="Left"
              onClick={() => {
                setState("Weekly");
                dispatch(getJobByweek(getDate));
                setSelectedDate("");
              }}
              onMouseOver={() => {
                handleMouseOver("");
              }}
              onMouseOut={() => {
                handleMouseOut("");
              }}
            >
              <VscClearAll size={18} color="#DC2F2B" />
              {isHovering?.isReset && <span className="hover">Reset</span>}
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <span
                className="Left"
                onClick={() => {
                  dispatch(getJobByweek(allJobData?.job?.date));
                }}
              >
                <AiOutlineLeft size={17.5} color="#DC2F2B" />
              </span>
              <span
                onClick={() => {
                  {
                    allJobData?.ForwardWeekData?.date == undefined
                      ? dispatch(
                          getNextWeekData(
                            allJobData?.ForwardWeekData?.date == undefined
                              ? getDate
                              : allJobData?.ForwardWeekData?.date
                          )
                        )
                      : dispatch(
                          getNextWeekData(
                            allJobData?.ForwardWeekData?.length > 0
                              ? allJobData?.ForwardWeekData?.date
                              : allJobData?.job?.date
                          )
                        );
                  }
                }}
                className="Left"
              >
                <AiOutlineRight size={17.5} color="#DC2F2B" />
              </span>
            </div>
          </div>
          {!isLoader ? (
            <>
              {allJobData?.job?.length != 0 ? (
                <div className="radio-input">
                  <input
                    type="radio"
                    id="Weekly"
                    name="timePeriod"
                    value={"Weekly"}
                    checked={state === "Weekly"}
                    onClick={() => {
                      setState("Weekly");
                      dispatch(getJobByweek(getDate));
                    }}
                  />
                  <label style={{ marginRight: 4 }}>Weekly</label>
                  <input
                    checked={state === "Daily"}
                    type="radio"
                    id="Daily"
                    name="timePeriod"
                    value={"Daily"}
                    onClick={() => {
                      setState("Daily");
                      dispatch(getJobData(getDate));
                    }}
                  />
                  <label>Daily</label>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      <JobsCalender
        tablestyling={"table-stly"}
        parentStyling={"table-wrapper"}
        data={state}
      />
    </>
  );
};

export default DashBoard;
