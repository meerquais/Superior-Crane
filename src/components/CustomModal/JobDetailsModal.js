import React, { useEffect, useState } from "react";
import "./CustomModal.css";
import { AiFillCloseCircle } from "react-icons/ai";
import PrimaryBtn from "../PrimaryBtn";
import { BsCloudDownloadFill } from "react-icons/bs";
import { generatePdf } from "../../redux/actions/TicketSAction";

const JobDetailsModal = ({ open, onClose, item, isLoader }) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (!open) return null;
  return (
    <div
      arrayImag={item}
      isLoader={isLoader}
      onClick={onClose}
      className="overlay"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer2"
      >
        {isLoading ? (
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <h1 style={{ marginTop: "0rem" }}>Job is Loading</h1>
            <BsCloudDownloadFill size={40} color="red" />
          </div>
        ) : (
          <>
            <div className="modalRight">
              <AiFillCloseCircle
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  cursor: "pointer",
                }}
                size={20}
                onClick={onClose}
              />
            </div>
            <h3 className="mainHeading">Job Details</h3>
            <div className="head">
              <span className="fieldTitle">Job Time</span>
              <span className="fieldValue">{item?.jobTime}</span>
            </div>
            <div className="head">
              <span className="fieldTitle">Client Name</span>
              <span className="fieldValue">{item?.clientName}</span>
            </div>
            <div className="head">
              <span className="fieldTitle">Address</span>
              <div className="fieldValue">
                {item?.address?.length > 30
                  ? item?.address?.substring(0, 29) + "..."
                  : item.address}
              </div>
            </div>
            <div className="head">
              <span className="fieldTitle">Equipment's</span>
              <span className="fieldValue">{item?.equipmentToBeUsed}</span>
            </div>
            <div className="head">
              <span className="fieldTitle">Job Date</span>
              <span className="fieldValue">{item?.jobDate}</span>
            </div>
            <div className="head">
              <span className="fieldTitle">Riggers</span>
              <span className="fieldValue">{item?.riggerAssigned}</span>
            </div>
            <div className="head">
              <span className="fieldTitle">Supplier Name </span>
              <span className="fieldValue">{item?.supplierName}</span>
            </div>
            <div className="head">
              <span className="fieldTitle">Notes</span>
              <span className="fieldValue">
                {item?.notes?.length > 30
                  ? item?.notes?.substring(0, 30) + "..."
                  : item?.notes}
              </span>
            </div>
            <div className="head">
              <span className="fieldTitle">Job jobNumber</span>
              <span className="fieldValue">{item?.jobNumber}</span>
            </div>
            <div className="head">
              <span className="fieldTitle">SCCI</span>
              <span className="fieldValue">{item?.SCII}</span>
            </div>
            <div className="head">
              <span className="fieldTitle">Rigger Ticket</span>
              {item?.pdfRigger == "N.A.N" ? (
                <span className="fieldValue">{item?.pdfRigger}</span>
              ) : (
                <PrimaryBtn
                  title={"Download"}
                  width={100}
                  height={25}
                  onclick={() => {
                    const wholeUri = `https://test.scserver.org/${item?.pdfRigger}`;
                    const link = document.createElement("a");
                    link.href = wholeUri;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                />
              )}
            </div>
            <div className="head">
              <span className="fieldTitle">Transportation Ticket</span>
              {item?.pdfTransportation == "N.A.N" ? (
                <span className="fieldValue">{item?.pdfTransportation}</span>
              ) : (
                <PrimaryBtn
                  title={"Download"}
                  width={100}
                  height={25}
                  onclick={() => {
                    const wholeUri = `https://test.scserver.org/${item?.pdfTransportation}`;
                    const link = document.createElement("a");
                    link.href = wholeUri;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                />
              )}
            </div>
            <div className="head">
              <span className="fieldTitle">Enter By</span>
              <span className="fieldValue">{item?.enterBy}</span>
            </div>
            <div className="head">
              <span className="fieldTitle">Images</span>
              <div className="imgCont">
                {item?.imageFiles?.length == 0 ? (
                  <span className="fieldTitle">NO Images</span>
                ) : (
                  <>
                    {item?.imageFiles?.map((item) => {
                      return (
                        <img
                          src={`https://test.scserver.org/files/${item}`}
                          className="allImge"
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="head">
              <PrimaryBtn
                width={150}
                height={35}
                title={"Close"}
                onclick={onClose}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobDetailsModal;
