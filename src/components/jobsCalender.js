import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobByweek, getJobData } from "../redux/actions/DashBoardActions";
import {
  ArrangedData,
  DateConvertor,
  DatetoDayNameConverter,
  convertTodayDate,
} from "../utils/HelpingFuntions";
import NotificationModal from "./WarningModal";
import ReactLoading from "react-loading";
import "./../pages/dashBoard/DashBoard.css";
import { Images } from "../utils/imsges";
import JobDetailsModal from "./CustomModal/JobDetailsModal";
import EditJobModal from "./CustomModal/EditJobModal";

const JobsCalender = ({ parentStyling, tablestyling, data }) => {
  const dispatch = useDispatch();
  const allJobData = useSelector((state) => state?.dashBoard);
  const isLoader = useSelector((state) => state?.dashBoard?.isLoading);
  const [isJobModal, setIsJobModal] = useState(false);
  const [selectItem, setSelectedItem] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const reArrangedDate = ArrangedData(allJobData?.job?.jobsInWeek);
  const order = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7
  };
  const newArrangedData = reArrangedDate?.sort((a, b) => {
    return order[a.name] - order[b.name];
  });
  var todaysDate = new Date();
  const getDate = convertTodayDate(todaysDate);
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var d = new Date(todaysDate);
  var dayName = days[d?.getDay()];
  useEffect(() => {
    dispatch(getJobByweek(getDate));
  }, []);

  return (
    <>
      <div className={reArrangedDate.length == 0 ? 'table-wrapper11' : parentStyling}>
        {isLoader ? <NotificationModal /> : null}
        <table
          data={data}
          className={tablestyling}
          cellPadding={-1}
        >
          {isLoader ? (
            <div
              style={{
                marginTop:"2rem",
                display:"flex",
                alignItems:"center",
                justifyContent: "center",
              }}
            >
              <ReactLoading
                type='spin'
                color={"red"}
                height={100}
                width={100}
                delay={4}
              />
            </div>
          ) : (
            <>
              {reArrangedDate.length == 0 ? (
                <div
                style={{
                  marginTop:"2rem",
                  display:"flex",
                  alignItems:"center",
                  justifyContent: "center",
              
                }}
                >
                  <h1>No Jobs Found! &#9888;</h1>
                </div>
              ) : (
                <>
                  {newArrangedData?.map((item, index) => {
                    return (
                      <>
                        <td key={index}>
                          <tr className="dataHeadingCont">
                            <h2 className="headingStyle">
                              {item?.name}
                              {/* {item.name == dayName ? "Today" : item.name} */}
                            </h2>
                          </tr>
                          <>
                            {item?.color?.map((item, index) => {
                              return (
                                <>
                                  <tr
                                    key={index}
                                    style={{
                                      backgroundColor:
                                      item?.isSCCI? '#cbcdd4':
                                        item.statusCode === "goodTogo"
                                          ? "#C9FFBB"
                                          : item.statusCode === "onHold"
                                            ? "#FFFCBB"
                                            : item.statusCode === "inProblem"
                                              ? "#FFBBBB"
                                              : "#fff",
                                    }}
                                  >
                                    <div className="dataList">
                                      <span className="jobData">
                                        {item.clientName} - {item.address} - {item.riggerAssigned} Riggers
                                      </span>
                                      <div className="innerStyle">
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div
                                            onClick={() => {
                                              setIsEdit(!isEdit);
                                              setSelectedItem(item);
                                            }}
                                          >
                                            <img
                                              style={{
                                                marginTop: '0.2rem',
                                              }}
                                              src={Images.edit}
                                              width={20}
                                              height={22}
                                            />
                                          </div>
                                          <div
                                            onClick={() => {
                                              setIsJobModal(!isJobModal);
                                              setSelectedItem(item);
                                            }}
                                          >
                                            <img
                                              src={Images.eyeIcon}
                                              width={20}
                                              height={20}
                                            />
                                          </div>
                                        </div>

                                        {isEdit ? (
                                          <EditJobModal
                                            open={isEdit}
                                            onClose={() => {
                                              setIsEdit(!isEdit);
                                            }}
                                            item={selectItem}
                                          />
                                        ) : null}
                                        <span className="date">
                                          {`${DateConvertor(item.jobTime)} |  ${item?.jobDate}`}
                                        </span>
                                      </div>
                                    </div>
                                  </tr>
                                  {isJobModal ? (
                                    <JobDetailsModal
                                      isLoader={true}
                                      open={isJobModal}
                                      onClose={() => setIsJobModal(false)}
                                      item={selectItem}
                                    />
                                  ) : null}
                                </>
                              );
                            })}
                          </>
                        </td>
                      </>
                    );
                  })}
                </>
              )}
            </>
          )}
        </table>
      </div>
    </>
  );
};

export default JobsCalender;
