import React, { useRef } from "react";
import JobFilterCard from "../../components/JobFilterCard";
import "./Joblist.css";
import PrimaryBtn from "../../components/PrimaryBtn";
import JoblistCard from "../../components/JobListCard";
import JobListTable from "../../components/JoblistTable";
import { useDispatch, useSelector } from "react-redux";
import {
  filterJobByParam,
  getJobData,
} from "../../redux/actions/DashBoardActions";
import CustomButton from "../../components/CustomButton";
import ReactLoading from "react-loading";
import { downloadTicketsData } from "../../redux/actions/TicketSAction";


const JobLists = () => {
  const jobParamsData = useSelector((state) => state?.usersData?.filterJob);
  const jobsData = useSelector((state) => state?.dashBoard?.job);
  const isDownloadingPdf = useSelector((state) => state?.ticketsData);
  
  const newArr = jobsData?.jobsInWeek?.map((item) => ({
    "Job Number": item?.jobNumber,
    "Client Name": item?.clientName,
    "Job Date": item?.jobDate,
    "Job Time": item?.jobTime,
    "Address": item?.address,
    "Equipment To Be Used": item?.equipmentToBeUsed,
    "Rigger Assigned": item?.riggerAssigned,
    "Supplier Name": item?.supplierName,
    "Notes": item?.notes,
    "Image Files": item?.imageFiles?.length > 0 ? item?.imageFiles?.map((item) => { return `https://test.scserver.org/files/${item}` }) : "No",
    "Enter By": item?.enterBy,
    "Status": item?.statusCode,
    "SCCI": item?.isSCCI ? "YES" : "NO",
    "Rigger Pdf": item?.pdfRigger
      ? `https://test.scserver.org/files/${item?.pdfRigger}`
      : "No",
    "Transportation Pdf": item?.pdfTransportation
      ? `https://test.scserver.org/files/${item?.pdfTransportation}`
      : "No",

  }));


  const dispatch = useDispatch();


  return (
    <div>
      <div className="main-con">
        <h3 style={{ marginLeft: '1rem' }}>FILTER</h3>
        <CustomButton
          title={
            isDownloadingPdf?.allJobLoadingPdf ?
              <div style={{ marginLeft: "3.4rem" }}>
                <ReactLoading
                  type="bars"
                  color={"white"}
                  height={50}
                  width={35}
                  delay={4}
                />
              </div>
              :
              "EXPORT TO EXCEL"}
          onclick={() => {
            dispatch(downloadTicketsData(newArr))

          }}
          buttonStyle={'btn-filter-style'}
        />
      </div>
      <div>
        <JobFilterCard
          mainContiner={"mainContiner"}
          dropDownStyling={"dropdownStyling"}
        />
      </div>
      <div>
      </div>
      <h3 style={{marginLeft:'3rem'}} >JOB LISTS</h3>
      <JobListTable />

    </div>
  );
};

export default JobLists;
