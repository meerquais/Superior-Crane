import React, { useState } from "react";
import "../pages/riggerTickets/Riggertickets.css";
import JoblistCard from "./JobListCard";
import { useDispatch, useSelector } from "react-redux";
import PrimaryBtn from "./PrimaryBtn";
import { baseUrl } from "../utils/Api";
import NotificationModal from "./WarningModal";
import ReactLoading from "react-loading";
import Modal from "./CustomModal/CustomModal";
import { generatePdf } from "../redux/actions/TicketSAction";

const payDutyFromTableHeading = [
  "Date",
  "Location",
  "Time Start",
  "End Time",
  "Total hours",
  "Email",
  "Officer Name",
  "Officer",
  "Division",
  "Signature",
  "Download Pdf",
];

const PayDutyFormTabel = ({ payDutyData }) => {
  const payDutyFormData = useSelector((state) => state?.ticketsData);
  const [openModal, setOpenModal] = useState(false);
  const [selsctedArray, setSelectedArry] = useState([]);
  const dispatch = useDispatch();
  const [selectedBtnId, setSelectedBtnId] = useState(-1);
  return (
    <>
      {payDutyFormData?.isTicketsDataLoading ? <NotificationModal /> : null}
      <div className="table-main-card">
        <div className="hack1">
          <div className="hack2">
            {payDutyFormData?.isTicketsDataLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ReactLoading
                  type="spin"
                  color={"red"}
                  height={100}
                  width={100}
                  delay={4}
                />
              </div>
            ) : (
              <>
                {payDutyFormData?.payDutyForm?.length == 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1>No Tickets Data Found</h1>
                  </div>
                ) : (
                  <table className="rigger-table" cellSpacing={0}>
                    <tr>
                      {payDutyFromTableHeading?.map((item) => {
                        return (
                          <>
                            <th className="th-styling">{item}</th>
                          </>
                        );
                      })}
                    </tr>
                    {payDutyFormData?.payDutyForm?.map((item, index) => {
                      return (
                        <tr>
                          <th className="item-styling">{item.date}</th>
                          <th className="item-styling">{item.location}</th>
                          <th className="item-styling">
                            {item.startTime}.{item.startAMPM}
                          </th>
                          <th className="item-styling">
                            {item.finishTime}.{item.finishAMPM}
                          </th>
                          <th className="item-styling">{item.totalHours}</th>
                          <th className="item-styling">{item.emailAddress}</th>
                          <th className="item-styling">{item.officerName}</th>
                          <th className="item-styling"> {item.officer}</th>
                          <th className="item-styling">{item.division}</th>
                          <th className="item-styling">
                            {item?.signature != "" ? (
                              <>
                                <div>
                                  <PrimaryBtn
                                    title={"Show"}
                                    onclick={() => {
                                      setOpenModal(true);
                                      setSelectedArry([item?.signature]);
                                    }}
                                  />
                                </div>
                                <Modal
                                  open={openModal}
                                  onClose={() => setOpenModal(false)}
                                  arrr={selsctedArray}
                                />
                              </>
                            ) : (
                              <p
                                style={{
                                  fontSize: "12px",
                                  color: "red",
                                }}
                              >
                                NO
                              </p>
                            )}
                          </th>
                          <th style={{ borderRight: "1px solid  #0000000d" }}>
                            <div key={index}>
                              <PrimaryBtn
                                title={
                                  payDutyFormData?.isGeneratingPdf &&
                                  selectedBtnId === index ? (
                                    <div>
                                      <ReactLoading
                                        type="bars"
                                        color={"white"}
                                        height={30}
                                        width={25}
                                        delay={4}
                                      />
                                    </div>
                                  ) : (
                                    "Download"
                                  )
                                }
                                onclick={() => {
                                  setSelectedBtnId(index);

                                  const newArr = {
                                    "DateForPayDuty": item?.date,
                                    "Location": item?.location,
                                    "Time Start":
                                      item?.startTime,
                                    "End Time":
                                      item.finishTime ,
                                    "Total hours": item?.totalHours,
                                    "EmailForPayDuty": item?.emailAddress,
                                    "Officer Name": item?.officerName,
                                    "Officer": item?.officer,
                                    "Division": item.division,
                                    "imagePaths": [
                                      item?.signature ? item?.signature : "sign.jpg",
                                    ],
                                    "imageNames":["Officer Signature"],
                                    "formtype": "Pay Duty",
                                  };
                                  dispatch(generatePdf(newArr));
                                }}
                              />
                            </div>
                          </th>
                        </tr>
                      );
                    })}
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PayDutyFormTabel;
