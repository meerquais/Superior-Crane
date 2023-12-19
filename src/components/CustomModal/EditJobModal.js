import React, { useEffect, useState, useRef } from "react";
import "./CustomModal.css";
import { AiFillCloseCircle } from "react-icons/ai";
import CustomInput from "../CustomInput";
import PrimaryBtn from "../PrimaryBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  editJob,
  handleMultipleImages,
  uploadImages,
} from "../../redux/actions/DashBoardActions";
import ReactLoading from "react-loading";

const EditJobModal = ({ open, onClose, item }) => {
  const [data, setData] = useState({});
  const [isScci, setIsScci] = useState(item?.isSCCI);
  const dispatch = useDispatch();
  const editJobRes = useSelector((state) => state?.dashBoard);
  const ref = useRef();
  const ref1 = useRef();
  const [imageURLS, setImageURLs] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (images.length <= 4) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  if (!open) return null;
  return (
    <div arrayImag={item} onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        {editJobRes?.isJobEditLoding ? (
          <div
            style={{
              width: "12rem",
              height: "14rem",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <ReactLoading width={100} height={40} color="red" type="spin" />
            <br />
            <h1 style={{ marginTop: "4rem" }}>Job is Updating</h1>
          </div>
        ) : null}
        {!editJobRes?.isJobEditLoding ? (
          <div className="modalRight">
            <AiFillCloseCircle
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                cursor: "pointer",
              }}
              size={18}
              onClick={onClose}
            />
            <h1>Edit Job</h1>
            <div className="input-div">
              <div className="single-input">
                <span style={{marginLeft:8}}>Client Name</span>
                <CustomInput
                  placeholder={
                    item?.clientName == ""
                      ? "Enter Client Name"
                      : item?.clientName
                  }
                  onChange={(e) => {
                    setData({ ...data, clientName: e.target.value });
                  }}
                  inputStyling={"input-Styling"}
                />
              </div>
              <div className="single-input">
                <span style={{marginLeft:8}}>Job Date</span>
                <input
                  placeholder={item?.jobDate ? item?.jobDate : ""}
                  type="text"
                  ref={ref}
                  onFocus={() => (ref.current.type = "date")}
                  onBlur={() => (ref.current.type = "date")}
                  onChange={(e) => {
                    setData({ ...data, jobDate: e.target.value });
                  }}
                  className={"input-Styling"}
                />
              </div>
            </div>
            <div className="input-div">
              <div className="single-input">
                <span style={{marginLeft:8}}>Job Time</span>
                <input
                  placeholder={item?.jobTime ? item?.jobTime : ""}
                  type="text"
                  ref={ref1}
                  onFocus={() => (ref1.current.type = "time")}
                  onBlur={() => (ref1.current.type = "time")}
                  onChange={(e) => {
                    setData({ ...data, jobTime: e.target.value });
                  }}
                  className={"input-Styling"}
                />
              </div>
              <div className="single-input">
                <span style={{marginLeft:8}}>Address</span>
                <CustomInput
                  placeholder={
                    item?.address == "" ? "Enter Adress" : item?.address
                  }
                  onChange={(e) => {
                    setData({ ...data, address: e.target.value });
                  }}
                  inputStyling={"input-Styling"}
                />
              </div>
            </div>

            <div className="input-div">
              <div className="single-input">
                <span style={{marginLeft:8}}>Equipment To Be Used</span>
                <CustomInput
                  placeholder={
                    item?.equipmentToBeUsed == ""
                      ? "Enter Equipment"
                      : item?.equipmentToBeUsed
                  }
                  onChange={(e) => {
                    setData({ ...data, equipmentToBeUsed: e.target.value });
                  }}
                  inputStyling={"input-Styling"}
                />
              </div>
              <div className="single-input">
                <span style={{marginLeft:8}}>Rigger Assigned</span>
                <CustomInput
                  placeholder={
                    item?.riggerAssigned == ""
                      ? "Enter Rigger Assigned"
                      : item?.riggerAssigned
                  }
                  onChange={(e) => {
                    setData({ ...data, riggerAssigned: e.target.value });
                  }}
                  inputStyling={"input-Styling"}
                />
              </div>
            </div>
            <div className="input-div">
              <div className="single-input">
                <span style={{marginLeft:8}}>Supplier Name</span>
                <CustomInput
                  placeholder={
                    item?.supplierName == ""
                      ? "Enter Supplier Name"
                      : item?.supplierName
                  }
                  onChange={(e) => {
                    setData({ ...data, supplierName: e.target.value });
                  }}
                  inputStyling={"input-Styling"}
                />
              </div>
              <div className="single-input">
                <span style={{marginLeft:8}}>Notes</span>
                <CustomInput
                  placeholder={item?.notes == "" ? "Enter Notes" : item?.notes}
                  onChange={(e) => {
                    setData({ ...data, notes: e.target.value });
                  }}
                  inputStyling={"input-Styling"}
                />
              </div>
            </div>
            <div className="input-div">
              <div className="single-input">
                <span style={{marginLeft:8}}>Status Code</span>
                <select
                  className={"input-Styling1"}
                  value={data?.statusCode}
                  onChange={(e) => {
                    setData({ ...data, statusCode: e.target.value });
                  }}
                >
                  <option value="" disabled selected hidden>
                    {data?.statusCode ?? item?.statusCode}
                  </option>
                  <option value="goodTogo">Good to go</option>
                  <option value="onHold">On hold</option>
                  <option value="inProblem">In problem</option>
                </select>
              </div>
            </div>

            <div 
            style={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              marginTop:'0.5rem',
            }}
            >
              <div>
              <input
                style={{
                  cursor: "pointer",
                }}
                checked={isScci ? true : false}
                onChange={(e) => {
                  setIsScci(e.target.checked);
                }}
                type="checkbox"
                />
              <span>SCCI</span>
                </div>
              <input
              style={{paddingLeft:'4px'}}
                type="file"
                multiple
                accept="image/*"
                onChange={onImageChange}
              />
              <PrimaryBtn
                stylbtn={{
                  marginLeft: 12,
                }}
                width={"12rem"}
                height={"2rem"}
                title={"Update"}
                onclick={() => {
                  dispatch(editJob(data, isScci, item?.jobId, images,onClose));
                }}
              />
            </div>
            {/* BTN */}
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <div className="btn-div">
                <div
                  style={{
                    marginTop: 5,
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <input
                    style={{
                      cursor: "pointer",
                    }}
                    checked={isScci ? true : false}
                    onChange={(e) => {
                      setIsScci(e.target.checked);
                    }}
                    type="checkbox"
                  />
                  <span>SCCI</span>
                </div>
                <div
                  style={{
                    marginTop: "0.6rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={onImageChange}
                  />
                </div>
              </div>
              <PrimaryBtn
                stylbtn={{
                  marginLeft: 12,
                }}
                width={"12rem"}
                height={"2rem"}
                title={"Update"}
                onclick={() => {
                  dispatch(editJob(data, isScci, item?.jobId, images));
                }}
              />
            </div> */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EditJobModal;
