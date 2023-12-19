import React from "react";
import CustomButton from "../../components/CustomButton";
import "./Transporation.css";
import RiggerTicketsFilterCard from "../../components/RiggerTicketsFilterCard";
import { TransportationData, optionList } from "../../utils/dummyData";
import TransportationTicketsTable from "../../components/TransportationTicketsTable";
import TranportationFilterCard from "../../components/TransportationFilterCard";
import { useDispatch, useSelector } from "react-redux";
import { downloadTicketsData } from "../../redux/actions/TicketSAction";
import ReactLoading from "react-loading";

const Transportaion = ({}) => {
  const riggerTicket = useSelector((state) => state?.ticketsData);
  const dispatch = useDispatch();
  const newArr = riggerTicket?.transportationTicketsData?.map((item) => (
    {
   "Billing Address":item?.billingAddress,
   "Customer Email":item?.customerEmail,
   "Customer Name":item?.customerName,
   "Date for Customer":item?.dateforcustomer,
   "Date for Driver":item?.datefordriver,
   "Date for Shipper":item?.dateforshipper,
   "Draft":item?.isDraft ? "yes":"NO",
   "Job Number":item?.jobNumber,
   "Note":item?.notes,
   "Pickup Driver Name":item?.pickUpDriverName,
   "Pickup Address":item?.pickupAddress,
   "Phone Number":item?.poNumber,
   "Shipper Name":item?.shipperName,
   "Signature for customer":item?.signatureforcustomer ? `https://test.scserver.org/files/${item?.signatureforcustomer}`
   : "No",
   "Signature for Driver":item?.signaturefordriver ? `https://test.scserver.org/files/${item?.signaturefordriver}`
   : "No",
   "Signature for Shipper":item?.signatureforshipper ? `https://test.scserver.org/files/${item?.signatureforshipper}`
   : "No",
   "Site Contact Name":item?.siteContactName,
   "Site Contact Number":item?.siteContactNumber,
   "Special Instruction for Contact Name":item?.specialInstructionsforconName,
   "Special Instruction for Contact Number":item?.specialInstructionsforconNo,
   "Special Instruction for Job":item?.specialInstructionsforjob,
   "Special Instruction for Job Phone Number":item?.specialInstructionsforpo,
   "Time in for Customer":item?.timeInforcustomer,
   "TimeIn for Driver":item?.timeInfordriver,
   "TimeIn for shipper":item?.timeInforshipper,
   "TimeIn for Trans":item?.timeInfortrans,
   "TimeOut for Customer":item?.timeOutforcustomer,
   "TimeOut for Driver":item?.timeOutfordriver,
   "TimeOut for Shipper":item?.timeOutforshipper,
   "TimeOut for Transportation":item?.timeOutfortrans,
  }
  ));
  return (
    <div>
      <div className="title-class">
        <h3 className="text">FILTER</h3>
        <CustomButton
          title={
            riggerTicket?.isTicketsDataLoading ? (
              <div style={{ marginLeft: "3.4rem" }}>
                <ReactLoading
                  type="bars"
                  color={"white"}
                  height={50}
                  width={35}
                  delay={4}
                />
              </div>
            ) : (
              "Export to excel"?.toLocaleUpperCase()
            )
          }
          onclick={() => {
            if (riggerTicket?.transportationTicketsData?.length > 0) {
              dispatch(
                downloadTicketsData(newArr)
              );
            } else {
              alert("Un Supported Data!");
            }
          }}
          buttonStyle={"btn-filter-style "}
        />
      </div>
      <TranportationFilterCard
        Name={"Customer Name"}
        Address={"Address"}
        Date={"Date"}
      />
      <div>
        <h3 style={{marginLeft:'2rem'}}>TRANSPORTATION TICKETS</h3>
        <TransportationTicketsTable transportaionTable={TransportationData} />
      </div>
    </div>
  );
};

export default Transportaion;
