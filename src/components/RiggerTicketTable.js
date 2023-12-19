import Rreact, { useState } from "react";
import "../pages/riggerTickets/Riggertickets.css";
import JoblistCard from "./JobListCard";
import { useDispatch, useSelector } from "react-redux";
import PrimaryBtn from "./PrimaryBtn";
import Modal from "./CustomModal/CustomModal";
import ReactLoading from "react-loading";
import NotificationModal from "./WarningModal";
import { generatePdf } from "../redux/actions/TicketSAction";

const riggerTictsFeidValues = [
  "Specifications And Remarks",
  "Customer",
  "Location",
  "PO. Number",
  "Date",
  "Start Job",
  "Arrival Yard",
  "Travel Time",
  "Total Hours",
  "Rating",
  "Operator",
  "Other Notes",
  "Leave Yard",
  "Email",
  "Finish Job",
  "Lunch",
  "Crane Time",
  "Crane Number",
  "Boom Length",
  "Other Equipment",
  "Signature",
  "Pay Duty",
  "Download Pdf",
];

const RiggerTicketsTable = ({ riggerTicketsTableData }) => {
  const riggerTicket = useSelector((state) => state?.ticketsData);
  const [openModal, setOpenModal] = useState(false);
  const [selsctedArray, setSelectedArry] = useState([]);
  const dispatch = useDispatch();
  const [selectedBtnId, setSelectedBtnId] = useState(-1);

  return (
    <>
      {riggerTicket?.isTicketsDataLoading ? <NotificationModal /> : null}
      <div className="table-main-card">
        <div className="hack1">
          <div className="hack2">
            {riggerTicket?.isTicketsDataLoading ? (
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
                {riggerTicket?.riggerTicketsData?.length == 0 ? (
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
                      {riggerTictsFeidValues?.map((item, index) => {
                        return (
                          <>
                            <th key={index} className="th-styling">
                              {item}
                            </th>
                          </>
                        );
                      })}
                    </tr>
                    {riggerTicket?.riggerTicketsData?.map((item, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <th className="item-styling">
                              {item.specificationsAndRemarks}
                            </th>
                            <th className="item-styling">{item.customer}</th>
                            <th className="item-styling">{item.location}</th>
                            <th className="item-styling">{item.poNumber}</th>
                            <th className="item-styling">{item.date}</th>
                            <th className="item-styling">{item.startJob}</th>
                            <th className="item-styling">{item.arrivalYard}</th>
                            <th className="item-styling">{item.travelTime}</th>
                            <th className="item-styling">{item.totalHours}</th>
                            <th className="item-styling">{item.rating}</th>
                            <th className="item-styling">{item.operation}</th>
                            <th className="item-styling">{item.notesOthers}</th>
                            <th className="item-styling">{item.leaveYard}</th>
                            <th className="item-styling">
                              {item.emailAddress}
                            </th>
                            <th className="item-styling">{item.finishJob}</th>
                            <th className="item-styling">{item.lunch}</th>
                            <th className="item-styling">{item.craneTime}</th>
                            <th className="item-styling">{item.craneNumber}</th>
                            <th className="item-styling">{item.boomLength}</th>
                            <th className="item-styling">
                              {item.otherEquipment}
                            </th>
                            <th style={{ borderRight: "1px solid  #0000000d" }}>
                              {item?.signature?.length > 0 ? (
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
                                <p>NO</p>
                              )}
                            </th>
                            <th className="item-styling">
                              {item.isPayDuty ? "Yes" : "No"}
                            </th>
                            <th style={{ borderRight: "1px solid  #0000000d" }}>
                              <div key={index}>
                                <PrimaryBtn
                                  title={
                                    riggerTicket?.isGeneratingPdf &&
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
                                    const newData = {
                                      "Specifications And Remarks":
                                        item?.specificationsAndRemarks,
                                      Customer: item?.customer,
                                      Location: item?.location,
                                      "PO. Number": item?.poNumber,
                                      Date: item?.date,
                                      "Start Job": item?.startJob,
                                      "Arrival Yard": item?.arrivalYard,
                                      "Travel Time": item?.travelTime,
                                      "Total Hours": item?.totalHours,
                                      Rating: item?.rating,
                                      Operator: item?.operation,
                                      "Other Notes": item?.notesOthers,
                                      "Leave Yard": item?.leaveYard,
                                      Email: item?.emailAddress,
                                      "Finish Job": item?.finishJob,
                                      Lunch: item?.lunch,
                                      "Crane Time": item?.craneTime,
                                      "Crane Number": item?.craneNumber,
                                      "Boom Length": item?.boomLength,
                                      "Other Equipment": item?.otherEquipment,
                                      imagePaths: [
                                        item?.signature
                                          ? item?.signature
                                          : "sign.jpg",
                                      ],
                                      imageNames: ["Customer Signature"],
                                      "Pay Duty": item?.isPayDuty
                                        ? "YES"
                                        : "No",
                                      formtype: "Rigger",
                                    };
                                    dispatch(generatePdf(newData));
                                  }}
                                />
                              </div>
                            </th>
                          </tr>
                        </>
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

export default RiggerTicketsTable;
