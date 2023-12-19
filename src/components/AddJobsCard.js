import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import PrimaryBtn from "./PrimaryBtn";
import { useDispatch, useSelector } from "react-redux";
import { creatingNewJob } from "../redux/actions/UserAction";
import NotificationModal from "./WarningModal";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

const AddJobsCard = ({
  leftStling,
  rightStying,
  inputFoucsed,
  checkBoxStyl,
}) => {
  const [data, setData] = useState({
    jobTime: "",
    clientName: "",
    date: "",
    notes: "",
    equipmentUsed: "",
    riggerAssigned: "",
    address: "",
    supplierName: "",
  });
  const [imgsSrc, setImgsSrc] = useState();
  const [Check, setCheck] = useState(false);
  const dispatch = useDispatch();
  const jobPostData = useSelector((state) => state?.usersData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [imageURLS, setImageURLs] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  return (
    <>
      {jobPostData?.isUserLoading ? <NotificationModal /> : null}
      <div style={addJobsStyling.main}>
        <div className={leftStling}>
          <span style={addJobsStyling.spanStyling}>Job Time</span>
          <CustomInput
            inputStyling={inputFoucsed}
            style={addJobsStyling.inputStyling}
            type={"time"}
            value={data?.jobTime}
            onChange={handleChange}
            placeholder={"Enter Job Time Here"}
            name={"jobTime"}
            id={"jobTime"}
            min="1:30"
            max="2:30"
          />
          <span style={addJobsStyling.spanStyling}>Client Name</span>
          <CustomInput
            inputStyling={inputFoucsed}
            style={addJobsStyling.inputStyling}
            type={"text"}
            placeholder={"Enter Client Name Here"}
            value={data?.clientName}
            onChange={handleChange}
            name={"clientName"}
            id={"clientName"}
          />
          <span style={addJobsStyling.spanStyling}>Date</span>
          <CustomInput
            inputStyling={inputFoucsed}
            style={addJobsStyling.inputStyling}
            type={"date"}
            placeholder={"Enter Date Here"}
            value={data?.date}
            onChange={handleChange}
            name={"date"}
            id={"date"}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={addJobsStyling.spanStyling}>Notes</span>
            <textarea
              className={inputFoucsed}
              style={addJobsStyling.textareaStyl}
              type={"text"}
              placeholder={"Type Notes Here....."}
              value={data?.notes}
              onChange={handleChange}
              name="notes"
              id="nptes"
            />
          </div>
          <div>
            <input
              checked={Check ? true : false}
              onChange={(e) => {
                setCheck(e?.target?.checked);
              }}
              className={checkBoxStyl}
              type="checkbox"
            />
            <label>SSCI</label>
          </div>
          <div
            style={{
              position: "relative",
              top: "1rem",
            }}
          >
            <PrimaryBtn
              onclick={() => {
                dispatch(
                  creatingNewJob(
                    data,
                    imgsSrc,
                    Check,
                    setData,
                    navigate,
                    imageURLS,
                    images
                  )
                );
              }}
              width={150}
              height={40}
              title={
                jobPostData?.isUserLoading ? (
                  <>
                    <div style={{ marginLeft: "3rem" }}>
                      <ReactLoading
                        type="spin"
                        color={"white"}
                        height={50}
                        width={35}
                        delay={4}
                      />
                    </div>
                  </>
                ) : (
                  "Add new job"
                )
              }
            />
          </div>
        </div>

        <div className={rightStying}>
          <span style={addJobsStyling.spanStyling}>Equipment To Be Used</span>
          <CustomInput
            inputStyling={inputFoucsed}
            style={addJobsStyling.inputStyling}
            type={"text"}
            placeholder={"Enter Equipment To Be Used Here"}
            value={data?.equipmentUsed}
            onChange={handleChange}
            name={"equipmentUsed"}
            id={"equipmentUsed"}
          />
          <span style={addJobsStyling.spanStyling}>Rigger Assigned</span>
          <CustomInput
            inputStyling={inputFoucsed}
            style={addJobsStyling.inputStyling}
            type={"number"}
            placeholder={"Enter Rigger Assigned Here"}
            value={data?.riggerAssigned}
            onChange={handleChange}
            name={"riggerAssigned"}
            id={"riggerAssigned"}
          />
          <span style={addJobsStyling.spanStyling}>Address</span>
          <CustomInput
            style={addJobsStyling.inputStyling}
            type={"text"}
            placeholder={"Enter Address Here"}
            inputStyling={inputFoucsed}
            value={data?.address}
            onChange={handleChange}
            name={"address"}
            id={"address"}
          />
          <span style={addJobsStyling.spanStyling}>Supplier Name</span>
          <CustomInput
            style={addJobsStyling.inputStyling}
            type={"text"}
            placeholder={"Enter Supplier Name Here"}
            inputStyling={inputFoucsed}
            value={data?.supplierName}
            onChange={handleChange}
            name={"supplierName"}
            id={"supplierName"}
          />
          <div>
            {imgsSrc?.length == 4 ? (
              <>
                <span
                  style={{
                    color: "#DC2F2B",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {" "}
                  4 images exits
                </span>
                <br />
                <span
                  style={{
                    color: "#DC2F2B",
                    fontSize: "13px",
                    fontWeight: "300",
                  }}
                >
                  {" "}
                  No more than 4 Images allow
                </span>
              </>
            ) : (
              <>
                <span style={addJobsStyling.spanStyling}>Upload File</span>
                <br />
                <input
                  type="file"
                  className={inputFoucsed}
                  multiple
                  accept="image/*"
                  onChange={onImageChange}
                  
                />
                {/* <input
                  className={inputFoucsed}
                  onChange={imageHandler}
                  type="file"
                  name="file"
                  accept=".png,.jpeg"
                /> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const addJobsStyling = {
  main: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  spanStyling: {
    fontSize: "15px",
    fontWeight: "500",
    lineHeight: "1.4rem",
  },
  inputStyling: {
    marginBottom: "0.5rem",
    width: "25rem",
    height: "1.7rem",
    border: "1px solid  #D6D6D6",
    borderRadius: "0.2rem",
    padding: "0 0 0 12px",
    fontSize: "14px",
    fontWeight: "400",
    color: "#000000",
  },
  textareaStyl: {
    width: "25rem",
    height: "6rem",
    marginBottom: "0.5rem",
    border: "1px solid  #D6D6D6",
    borderRadius: "0.2rem",
  },
};

export default AddJobsCard;
