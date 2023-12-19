import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import RiggerTicketsTable from "../../components/RiggerTicketTable";
import RiggerTicketsFilterCard from "../../components/RiggerTicketsFilterCard";
import { optionList, riggerTicketsData } from "../../utils/dummyData";
import "./Riggertickets.css";
import { downloadTicketsData } from "../../redux/actions/TicketSAction";
import ReactLoading from "react-loading";
import { baseUrl } from "../../utils/Api";

const RiggerTickets = () => {
  const riggerTicket = useSelector((state) => state?.ticketsData);
  const dispatch = useDispatch();
  const newArr = riggerTicket?.riggerTicketsData?.map((item) => ({
    "Arrival Yard": item?.arrivalYard,
    "Boom Length": item?.boomLength,
    "Crane Number": item?.craneNumber,
    "Crane Time": item?.craneTime,
    Customer: item?.customer,
    Date: item?.date,
    "Finish Job": item?.finishJob,
    "Pay Duty": item?.isPayDuty ? "Yes" : "No",
    "Leave Yard": item?.leaveYard,
    Loaction: item?.location,
    Lunch: item?.lunch,
    "Other notes": item?.notesOthers,
    Operator: item?.operation,
    "Other Equipment": item?.otherEquipment,
    "Phone Number": item?.poNumber,
    Signature: item?.signature
      ? `https://test.scserver.org/files/${item?.signature}`
      : "No",
    "Specification and Remarks": item?.specificationsAndRemarks,
    "Start Job": item?.startJob,
    "Total Hours": item?.totalHours,
    "Travel Time": item?.travelTime,
  }));
  return (
    <div>
      <div className="title-class">
        <h3>FILTER</h3>
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
            dispatch(downloadTicketsData(newArr));
          }}
          buttonStyle={"btn-filter-style"}
        />
      </div>
      <div>
        <RiggerTicketsFilterCard
          Name={"Customer Name"}
          Address={"Address"}
          Date={"Date"}
          optionArray={optionList}
        />
      </div>
      <div>
        <h3 style={{marginLeft:'2rem'}}>RIGGER TICKETS</h3>
        <RiggerTicketsTable riggerTicketsTableData={riggerTicketsData} />
      </div>
    </div>
  );
};

export default RiggerTickets;
