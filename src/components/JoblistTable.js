import React, { useState, useEffect } from "react";
import { Images } from "../utils/imsges";
import { useSelector } from "react-redux";
import NotificationModal from "./WarningModal";
import ReactLoading from "react-loading";
import PrimaryBtn from "./PrimaryBtn";
import Modal from "./CustomModal/CustomModal";
import EditJobModal from "./CustomModal/EditJobModal";
import "./../pages/jobLists/Joblist.css";

const JobListTable = () => {
  const jobData = useSelector((state) => state?.dashBoard?.job);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selsctedArray, setSelectedArry] = useState([]);
  const [editData, setEditData] = useState();

  return (
    <>
      {jobData?.isLoading ? <NotificationModal /> : null}
      <div className="table-main-card">
        <div className="hack1">
          <div className="hack2">
            {jobData?.isLoading ? (
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
                {jobData?.jobsInWeek?.length == 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1>No Jobs Data Found</h1>
                  </div>
                ) : (
                  <table className="rigger-table" cellSpacing={0}>
                    <tr>
                      <th className="th-styling">Job Time</th>
                      <th className="th-styling">Client Name</th>
                      <th className="th-styling">Address</th>
                      <th className="th-styling">Equipment's</th>
                      <th className="th-styling">Job Date</th>
                      <th className="th-styling">Riggers</th>
                      <th className="th-styling">Supplier Name</th>
                      <th className="th-styling">Notes</th>
                      <th className="th-styling">Job Number</th>
                      <th className="th-styling">Images</th>
                      <th className="th-styling">SCCI</th>
                      <th className="th-styling">Rigger Ticket</th>
                      <th className="th-styling">Transportation Ticket</th>
                      <th className="th-styling">Enter By</th>
                      <th className="th-styling">Job Status</th>
                      <th className="th-styling">Action</th>
                    </tr>
                    {jobData?.jobsInWeek?.map((item) => {
                      return (
                        <>
                          <tr className="item-styling">
                            <td className="item-styling">{item.jobTime}</td>
                            <td className="item-styling">{item.clientName}</td>
                            <td className="item-styling">{item.address}</td>
                            <td className="item-styling">
                              {item.equipmentToBeUsed}
                            </td>
                            <td className="item-styling">{item.jobDate}</td>
                            <td className="item-styling">
                              {item.riggerAssigned}
                            </td>
                            <td className="item-styling">
                              {item.supplierName}
                            </td>
                            <td className="item-styling">{item.notes}</td>
                            <td className="item-styling">{item.jobNumber}</td>
                            <td className="item-styling">
                              {item.imageFiles?.length > 0 ? (
                                <>
                                  <PrimaryBtn
                                    title={"Show"}
                                    onclick={() => {
                                      setOpenModal(true);
                                      setSelectedArry(item?.imageFiles);
                                    }}
                                  />
                                  <Modal
                                    isLoader={true}
                                    open={openModal}
                                    onClose={() => setOpenModal(false)}
                                    arrr={selsctedArray}
                                  />
                                </>
                              ) : (
                                <p>No Images</p>
                              )}
                            </td>
                            <td className="item-styling">
                              {item.isSCCI ? "Yes" : "No"}
                            </td>
                            <td className="item-styling">
                              {item?.pdfRigger == null ? (
                                <p style={{ textAlign: "center" }}>N.a.N</p>
                              ) : (
                                <div style={jobTablestyling.btnStling}>
                                  <PrimaryBtn
                                    title={"Download"}
                                    onclick={() => {
                                      setSelectedArry(item?.pdfRigger);
                                      const wholeUri = `https://test.scserver.org${item?.pdfRigger}`;
                                      const link = document.createElement("a");
                                      link.href = wholeUri;
                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);
                                    }}
                                  />
                                </div>
                              )}
                            </td>
                            <td className="item-styling">
                              {item?.pdfTransportation == null ? (
                                <p style={{ textAlign: "center" }}>N.a.N</p>
                              ) : (
                                <>
                                  <div style={jobTablestyling.btnStling}>
                                    <PrimaryBtn
                                      title={"Download"}
                                      onclick={() => {
                                        setSelectedArry(item?.pdfRigger);
                                        const wholeUri = `https://test.scserver.org${item?.pdfTransportation}`;
                                        const link =
                                          document.createElement("a");
                                        link.href = wholeUri;
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                      }}
                                    />
                                  </div>
                                </>
                              )}
                            </td>
                            <td className="item-styling">{item.enterBy}</td>
                            <td className="item-styling">{item.statusCode}</td>
                            <td className="item-styling">
                              {item?.pdfTransportation != null ||
                              item?.pdfRigger != null ? (
                                <>
                                  <span
                                    style={{
                                      color: "green",
                                    }}
                                  >
                                    Job Closed
                                  </span>
                                </>
                              ) : (
                                <>
                                  <img
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    src={Images.edit}
                                    width={20}
                                    height={20}
                                    onClick={() => {
                                      setEditData(item);
                                      setOpenEditModal(!openEditModal);
                                    }}
                                  />
                                  <EditJobModal
                                    item={editData}
                                    open={openEditModal}
                                    onClose={() =>
                                      setOpenEditModal(!openEditModal)
                                    }
                                  />
                                </>
                              )}
                            </td>
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

const jobTablestyling = {
  table: {
    borderCollapse: "collapse",
    border: "1px solid #F2F2F2",
  },
  trStyling: {
    borderRight: "1px solid #F2F2F2",
    marginTop: "2rem",
    position: "sticky",
    top: 0,
    backgroundColor: "white",
  },
  thstyling: {
    border: "1px solid #F2F2F2",
    fontSize: "15px",
    fontWeight: "500",
    textAlign: "center",
  },
  trStyling2: {
    border: "1px solid #F2F2F2",
  },
  itemStling: {
    fontSize: "13px",
    fontWeight: "500",
    paddingLeft: 2,
    paddingRight: 2,
    border: "1px solid #F2F2F2",
    padding: "0.3rem",
    textAlign: "center",
  },
  btnStling: {
    fontSize: "13px",
    fontWeight: "500",
    paddingLeft: 2,
    paddingRight: 2,
    padding: "0.3rem",
    textAlign: "center",
  },
  headingStyling: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "150px",
    height: "10px",
    padding: "20px",
    border: "1px solid #F2F2F2",
    fontSize: "15px",
    fontWeight: "800",
    textAlign: "center",
  },
};

export default JobListTable;
