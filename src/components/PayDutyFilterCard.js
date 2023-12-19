import React, { useEffect, useState } from "react";
import Select from "react-select";
import "../pages/riggerTickets/Riggertickets.css";
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterPayDutyData,
  getPayDutyFormsData,
} from "../redux/actions/TicketSAction";
import ReactLoading from "react-loading";
import PrimaryBtn from "./PrimaryBtn";

const PayDutyFilterCard = ({ Name, Address, Date }) => {
  const [data, setData] = useState({});
  const payDutyForm = useSelector((state) => state?.ticketsData);
  const dispatch = useDispatch();

  const newData = payDutyForm?.payDutyForm?.map((v) => ({
    value: v?.officerName,
    label: v?.officerName,
  }));

  const newAdress = payDutyForm?.payDutyForm?.map((v) => ({
    value: v?.location,
    label: v?.location,
  }));

  const uniqueName = newData?.filter((obj, index) => {
    return index === newData.findIndex((o) => obj.value === o.value);
  });

  const uniqueAdress = newAdress?.filter((obj, index) => {
    return index === newAdress.findIndex((o) => obj.value === o.value);
  });

  useEffect(() => {
    dispatch(getPayDutyFormsData());
  }, []);

  return (
    <div className="main-card">
      <div className="mini-card">
        <div className="sub-container">
          <span className="title">{Name}</span>
          <Select
            className={"dropDownStyling"}
            options={uniqueName}
            onChange={(e) => {
              setData({ ...data, officerName: e?.label });
            }}
            placeholder={data.client == "" ? "Search Name" : data.client}
          />
        </div>
        <div className="sub-container">
          <span className="title">{Address}</span>
          <Select
            className={"dropDownStyling"}
            options={uniqueAdress}
            onChange={(e) => {
              setData({ ...data, location: e?.label });
            }}
            placeholder={data.address == "" ? "Search Address" : data.address}
            isSearchable={true}
          />
        </div>
        <div className="sub-container">
          <span className="title">{Date}</span>
          <input
            onChange={(e) => {
              setData({ ...data, date: e.target.value });
            }}
            type={"date"}
            className={"dateStyling"}
          />
        </div>
      </div>
      <div className="btn-container">
        <div
          style={{
            display: "flex",
          }}
        >
          <CustomButton
            title={
              payDutyForm?.isPayDutyFormLoading ? (
                <>
                  <div style={{ marginLeft: "3.4rem" }}>
                    <ReactLoading
                      type="bars"
                      color={"white"}
                      height={50}
                      width={35}
                      delay={4}
                    />
                  </div>
                </>
              ) : (
                "Filter"?.toLocaleUpperCase()
              )
            }
            buttonStyle={"btn-filter-style"}
            onclick={() => {
              dispatch(getFilterPayDutyData(data));
            }}
          />
          {data.officerName ||
          data.location ||
          data.date != undefined ? (
            <div
              style={{
                marginLeft: 3,
              }}
            >
              <PrimaryBtn
                width={120}
                height={40}
                title={"Reset Filter"}
                onclick={() => {
                  dispatch(getPayDutyFormsData());
                  window?.location?.reload()
                }}
              />
            </div>
          ) : null}
        </div>
        {/* <CustomButton
          title={
            payDutyForm?.isPayDutyFormLoading ? (
              <>
                <div style={{ marginLeft: "3.4rem" }}>
                  <ReactLoading
                    type="bars"
                    color={"white"}
                    height={50}
                    width={35}
                    delay={4}
                  />
                </div>
              </>
            ) : (
              "Filter"?.toLocaleUpperCase()
            )
          }
          buttonStyle={"btn-filter-style"}
          onclick={() => {
           dispatch(getFilterPayDutyData(data))
          }}
        /> */}
      </div>
    </div>
  );
};

export default PayDutyFilterCard;
