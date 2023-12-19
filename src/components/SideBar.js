import { useNavigate } from "react-router-dom";
import { Images } from "../utils/imsges";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUsersDetail, getWebUser } from "../redux/actions/UserAction";
import { getJobByweek, getJobData } from "../redux/actions/DashBoardActions";
import {
  getPayDutyFormsData,
  getRiggerTicketsData,
  getTransportationTicketsData,
} from "../redux/actions/TicketSAction";
import { convertTodayDate } from "../utils/HelpingFuntions";

const SideBar = ({ sideBarStyling, tagdiv }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var todaysDate = new Date();
  const getDate = convertTodayDate(todaysDate);

  const [isshow, setIshow] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [activeState, setActiveState] = useState({
    dashBoard: false,
    joblist: false,
    addJobs: false,
    user: false,
    admin: false,
    managers: false,
    basicUser: false,
    rigger: false,
    transportation: false,
    paydutyForm: false,
    addUser: false,
  });

  return (
    <div className={sideBarStyling}>
      <div className={tagdiv}>
        <label
          style={{
            fontSize: "11px",
            fontWeight: "500",
            color: "#FFFFFFCC",
          }}
        >
          {"MENU"}
        </label>
        <div
          onClick={(e) => {
            navigate("/dashBoard");
            setActiveState({ dashBoard: e.bubbles });
            // dispatch(getJobData());
            dispatch(getJobByweek(getDate));

          }}
          style={styling.iconStyle}
        >
          <img src={Images.dashBoard} width={12} height={12} />
          <label
            style={
              activeState.dashBoard
                ? styling.labelStylteColr
                : styling.labelStylte
            }
          >
            Dashboards
          </label>
        </div>
        <div
          onClick={(e) => {
            // navigate("/joblists");
            setIshow(!isshow);
            setActiveState({ joblist: e.bubbles });
          }}
          style={styling.iconStyle}
        >
          <img src={Images.joblist} width={12} height={12} />
          <label
           onClick={(e) => {
            // navigate("/joblists");
            setIshow(!isshow);
            setActiveState({ joblist: e.bubbles });
          }}
            style={
              activeState.joblist
                ? styling.labelStylteColr
                : styling.labelStylte
            }
          >
            Jobs
          </label>
          <div
            style={styling.upDownArrow}
            onClick={(e) => {
              setIshow(!isshow);
              setActiveState({ joblist: e.bubbles });
            }}
          >
            {isshow ? (
              <img src={Images.upArrow} />
            ) : (
              <img src={Images.downArrow} />
            )}
          </div>
        </div>
        {isshow ? (
          <>
            <label
              onClick={(e) => {
                navigate("/joblists");
                setActiveState({ joblist: e.bubbles });
                // dispatch(getJobData());
                dispatch(getJobByweek(getDate));

              }}
              style={
                activeState.joblist
                  ? styling.labelStylteColr1
                  : styling.labelStylte1
              }
            >
              All Jobs
            </label>
            <label
              style={
                activeState.addJobs
                  ? styling.labelStylteColr1
                  : styling.labelStylte1
              }
              onClick={(e) => {
                navigate("/addjobs");
                setActiveState({ addJobs: e.bubbles });
              }}
            >
              Add Jobs
            </label>
          </>
        ) : null}
        <div
          onClick={(e) => {
            setIsUser(!isUser);
            setActiveState({ user: e.bubbles });
          }}
          style={styling.iconStyle}
        >
          <img src={Images.user} width={12} height={12} />
          <label
            style={
              activeState.user ? styling.labelStylteColr : styling.labelStylte
            }
          >
            Users
          </label>
          <div
            style={styling.upDownArrow1}
            onClick={(e) => {
              setIsUser(!isUser);
              setActiveState({ user: e.bubbles });
            }}
          >
            {isUser ? (
              <img src={Images.upArrow} />
            ) : (
              <img src={Images.downArrow} />
            )}
          </div>
        </div>
        {isUser ? (
          <>
            <label
              style={
                activeState.addUser
                  ? styling.labelStylteColr1
                  : styling.labelStylte1
              }
              onClick={(e) => {
                navigate("/user");
                setActiveState({ addUser: e.bubbles });
              }}
            >
              Add User
            </label>

            <label
              style={
                activeState.admin
                  ? styling.labelStylteColr1
                  : styling.labelStylte1
              }
              onClick={(e) => {
                navigate("/admin");
                setActiveState({ admin: e.bubbles });
                dispatch(getWebUser("Admin"));
              }}
            >
              Admins
            </label>
            <label
              style={
                activeState.managers
                  ? styling.labelStylteColr1
                  : styling.labelStylte1
              }
              onClick={(e) => {
                navigate("/managers");
                setActiveState({ managers: e.bubbles });
                dispatch(getUsersDetail("Manager"));
              }}
            >
              Managers
            </label>
            <label
              style={
                activeState.basicUser
                  ? styling.labelStylteColr1
                  : styling.labelStylte1
              }
              onClick={(e) => {
                navigate("/basicuser");
                setActiveState({ basicUser: e.bubbles });
                dispatch(getUsersDetail("User"));
              }}
            >
              Basic Users
            </label>
          </>
        ) : null}

        <div
          onClick={(e) => {
            navigate("/riggerticket");
            setActiveState({ rigger: e.bubbles });
            dispatch(getRiggerTicketsData());
          }}
          style={styling.iconStyle}
        >
          <img src={Images.ticket} width={12} height={12} />
          <label
            style={
              activeState.rigger ? styling.labelStylteColr : styling.labelStylte
            }
          >
            Rigger Tickets
          </label>
        </div>

        <div
          onClick={(e) => {
            navigate("/transportation");
            setActiveState({ transportation: e.bubbles });
            dispatch(getTransportationTicketsData());
          }}
          style={styling.iconStyle}
        >
          <img src={Images.tranportation} width={12} height={12} />
          <label
            style={
              activeState.transportation
                ? styling.labelStylteColr
                : styling.labelStylte
            }
          >
            Transportation Tickets
          </label>
        </div>

        <div
          onClick={(e) => {
            navigate("/paydutyform");
            setActiveState({ paydutyForm: e.bubbles });
            dispatch(getPayDutyFormsData());
          }}
          style={styling.iconStyle}
        >
          <img src={Images.paydutyForm} width={12} height={12} />
          <label
            style={
              activeState.paydutyForm
                ? styling.labelStylteColr
                : styling.labelStylte
            }
          >
            Pay Duty Form
          </label>
        </div>
      </div>
    </div>
  );
};

const styling = {
  labelStylteColr: {
    marginLeft: "0.5rem",
    fontSize: "11px",
    color: "#FFFFFF",
  },
  labelStylte: {
    marginLeft: "0.5rem",
    fontSize: "11px",
    color: "#FFFFFFCC",
  },
  labelStylteColr1: {
    color: "#FFFFFF",
    fontSize: "11px",
    fontWeight: "500",
    marginTop: "0.5rem",
    marginLeft: "1rem",
  },
  labelStylte1: {
    fontSize: "11px",
    fontWeight: "500",
    color: "#FFFFFFCC",
    marginTop: "0.5rem",
    marginLeft: "1rem",
  },
  iconStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0.8rem",
  },
  upDownArrow: {
    marginLeft: "4.5rem",
    cursor:'pointer'
  },
  upDownArrow1: {
    marginLeft: "4.1rem",
    cursor:'pointer'

  },
};

export default SideBar;
