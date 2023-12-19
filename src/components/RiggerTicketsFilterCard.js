import React, { useEffect, useState } from "react";
import Select from "react-select";
import "../pages/riggerTickets/Riggertickets.css";
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  filterRiggerParams,
  filterRiggerTickets,
  getRiggerTicketsData,
} from "../redux/actions/TicketSAction";
import ReactLoading from "react-loading";
import PrimaryBtn from "./PrimaryBtn";

const RiggerTicketsFilterCard = ({ Name, Address, Date, optionArray }) => {
  const [data, setData] = useState({});
  const riggerTicket = useSelector((state) => state?.ticketsData);
  const dispatch = useDispatch();
  const newData = riggerTicket?.riggerTicketsData?.map((v) => ({
    value: v.customer,
    label: v.customer,
  }));
  const newAdress = riggerTicket?.riggerTicketsData?.map((v) => ({
    value: v.location,
    label: v.location,
  }));
  const uniqueName = newData.filter((obj, index) => {
    return index === newData.findIndex((o) => obj.value === o.value);
  });
  const uniqueAdress = newAdress.filter((obj, index) => {
    return index === newAdress.findIndex((o) => obj.value === o.value);
  });

  useEffect(() => {
    dispatch(getRiggerTicketsData());
  }, []);

  return (
    <div className="main-card">
      <div className="mini-card">
        <div className="sub-container">
          <span className="title">{Name}</span>
          <Select
          // isClearable={true}
          // isSearchable={true}
            className={"dropDownStyling"}
            options={uniqueName}
            onChange={(e) => {
              setData({ ...data, customer: e?.label });
            }}
            placeholder={data.customer == "" ? "Search Name" : data.customer}
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
            placeholder={data.location == "" ? "Search Address" : data.location}
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
        <div  style={{
            display: "flex",
          }}>
          <CustomButton
            title={
              riggerTicket?.isRiggerFilterLoading ? (
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
              if (
                data?.client != "" ||
                data?.location != "" ||
                data?.date != ""
              ) {
                dispatch(filterRiggerTickets(data));
              } else {
                alert("Select any of the type!");
              }
            }}
          />
          {data.customer ||
          data.billingAddress ||
          data.dateforcustomer != undefined ? (
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
                  dispatch(getRiggerTicketsData());
                  window?.location?.reload()
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RiggerTicketsFilterCard;
