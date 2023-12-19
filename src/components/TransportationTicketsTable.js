import React, { useState } from "react";
import JobListCard from "./JobListCard";
import "../pages/riggerTickets/Riggertickets.css";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import NotificationModal from "./WarningModal";
import PrimaryBtn from "./PrimaryBtn";
import Modal from "./CustomModal/CustomModal";
import { generatePdf } from "../redux/actions/TicketSAction";

const transportTableData = [
  "Pickup Address",
  "Delivery Address", //Billinng ADD
  "Time In",
  "Time Out",
  "Notes",
  "Job Number",
  "Special Instructions",
  "P.O. Number",
  "Special Instructions",
  "Site Contact Name",
  "Special Instructions",
  "Site Contact Number",
  "Special Instructions",
  "Shipper Name",
  "Signature",
  "Date",
  "Time In",
  "Time Out",
  "Pickup Driver Name",
  "Signature",
  "Date",
  "Time In",
  "Time Out",
  "Customer Name",
  "Customer Email",
  "Signature",
  "Date",
  "Time In",
  "Time Out",
  "Draft",
  // "Images",
  "Download Pdf",
];

const TransportationTicketsTable = ({ transportaionTable }) => {
  const transportationTickets = useSelector((state) => state?.ticketsData);
  const [openModal, setOpenModal] = useState(false);
  const [selsctedArray, setSelectedArry] = useState([]);
  const [selectedBtnId, setSelectedBtnId] = useState(-1);
  const dispatch = useDispatch();
  return (
    <>
      {transportationTickets?.isTicketsDataLoading ? (
        <NotificationModal />
      ) : null}
      <div className="table-main-card">
        <div className="hack1">
          <div className="hack2">
            {transportationTickets?.isTicketsDataLoading ? (
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
                {transportationTickets?.transportationTicketsData?.length ==
                0 ? (
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
                  <table className="rigger-table">
                    <tr>
                      {transportTableData.map((item) => {
                        return (
                          <>
                            <th className="th-styling">{item}</th>
                          </>
                        );
                      })}
                    </tr>
                    {transportationTickets?.transportationTicketsData?.map(
                      (item, index) => {
                        return (
                          <>
                            <tr>
                              <th className="item-styling">
                                {item.pickupAddress}
                              </th>
                              <th className="item-styling">
                                {item.billingAddress}
                              </th>
                              <th className="item-styling">
                                {item.timeInfortrans}
                              </th>
                              <th className="item-styling">
                                {item.timeOutfortrans}
                              </th>
                              <th className="item-styling">{item.notes}</th>
                              <th className="item-styling">{item.jobNumber}</th>
                              <th className="item-styling">
                                {item.specialInstructionsforjob}
                              </th>
                              <th className="item-styling">{item.poNumber}</th>
                              <th className="item-styling">
                                {item.specialInstructionsforpo}
                              </th>
                              <th className="item-styling">
                                {item.siteContactName}
                              </th>
                              <th className="item-styling">
                                {item.specialInstructionsforconName}
                              </th>
                              <th className="item-styling">
                                {item.siteContactNumber}
                              </th>
                              <th className="item-styling">
                                {item.specialInstructionsforconNo}
                              </th>
                              <th className="item-styling">
                                {item.shipperName}
                              </th>
                              <th className="item-styling">
                                {item?.signatureforshipper != null ? (
                                  <>
                                    <div>
                                      <PrimaryBtn
                                        title={"Show"}
                                        onclick={() => {
                                          setOpenModal(true);
                                          setSelectedArry([
                                            item?.signatureforshipper,
                                          ]);
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
                              <th className="item-styling">
                                {item.dateforshipper}
                              </th>
                              <th className="item-styling">
                                {item.timeInforshipper}
                              </th>
                              <th className="item-styling">
                                {item.timeOutforshipper}
                              </th>
                              <th className="item-styling">
                                {item.pickUpDriverName}
                              </th>
                              <th className="item-styling">
                                {item?.signaturefordriver != null ? (
                                  <>
                                    <div>
                                      <PrimaryBtn
                                        title={"Show"}
                                        onclick={() => {
                                          setOpenModal(true);
                                          setSelectedArry([
                                            item?.signaturefordriver,
                                          ]);
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
                              <th className="item-styling">
                                {item.datefordriver}
                              </th>
                              <th className="item-styling">
                                {item.timeInfordriver}
                              </th>
                              <th className="item-styling">
                                {item.timeOutfordriver}
                              </th>
                              <th className="item-styling">
                                {item.customerName}
                              </th>
                              <th className="item-styling">
                                {item.customerEmail}
                              </th>
                              <th className="item-styling">
                                {item?.signatureforcustomer != null ? (
                                  <>
                                    <div>
                                      <PrimaryBtn
                                        title={"Show"}
                                        onclick={() => {
                                          setOpenModal(true);
                                          setSelectedArry([
                                            item?.signatureforcustomer,
                                          ]);
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
                              <th className="item-styling">
                                {item.dateforcustomer}
                              </th>
                              <th className="item-styling">
                                {item.timeInforcustomer}
                              </th>
                              <th className="item-styling">
                                {item.timeOutfortrans}
                              </th>
                              <th className="item-styling">
                                {item.isDraft ? "Yes" : "No"}
                              </th>

                              {/* <th className="item-styling">{"IMAGES"}</th> */}
                              <th
                                style={{ borderRight: "1px solid  #0000000d" }}
                              >
                                <div key={index}>
                                  <PrimaryBtn
                                    title={
                                      transportationTickets?.isGeneratingPdf &&
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
                                        "Pickup Address": item?.pickupAddress,
                                        "Delivery Address":
                                          item?.billingAddress,
                                        "Time In": item?.timeInfortrans,
                                        "Time Out": item?.timeOutfortrans,
                                        Notes: item?.notes,
                                        "Job Number": item?.jobNumber,
                                        "Special Instructions For Job":
                                          item?.specialInstructionsforjob,
                                        "P.O. Number": item?.poNumber,
                                        "Special Instructions For P.O. Number":
                                          item?.specialInstructionsforpo,
                                        "Site Contact Name":
                                          item?.siteContactName,
                                        "Special Instructions For Contact Name ":
                                          item?.specialInstructionsforconName,
                                        "Site Contact Number":
                                          item.siteContactNumber,
                                        "Special Instructions For Contact Number":
                                          item?.specialInstructionsforconNo,
                                        "Shipper Name": item?.shipperName,

                                        "Date For Shipper": item?.dateforshipper,
                                        "Time In For Shipper": item?.timeInforshipper,
                                        "Time Out For Shipper": item?.timeOutforshipper,
                                        "Pickup Driver Name":
                                          item?.pickUpDriverName,

                                        "Date For Driver": item?.datefordriver,
                                        "Time In Driver": item?.timeInfordriver,
                                        "Time Out Driver": item?.timeOutfordriver,
                                        "Customer Name": item?.customerName,
                                        "Customer Email": item?.customerEmail,
                                        "imagePaths": [
                                          item?.signatureforcustomer
                                            ? item?.signatureforcustomer
                                            : "sign.jpg",
                                          item?.signatureforshipper
                                            ? item?.signatureforshipper
                                            : "sign.jpg",
                                          item?.signaturefordriver
                                            ? item?.signaturefordriver
                                            : "sign.jpg",
                                        ],
                                        "imageNames": [
                                          "Signature for Customer",
                                          "Signature for Shipper",
                                          "Signature for Driver",
                                        ],
                                        "Date For Customer": item?.dateforcustomer,
                                        "Time In Customer": item?.timeInforcustomer,
                                        "Time Out Customer": item?.timeOutfortrans,
                                        Draft: item.isDraft ? "Yes" : "No",
                                        formtype: "Transportation",
                                      };
                                      dispatch(generatePdf(newData));
                                    }}
                                  />
                                </div>
                              </th>
                            </tr>
                          </>
                        );
                      }
                    )}
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

export default TransportationTicketsTable;