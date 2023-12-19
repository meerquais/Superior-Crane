import React, { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import "../pages/riggerTickets/Riggertickets.css";
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  filterRiggerParams,
  filterRiggerTickets,
  filterTransportationTicketsData,
  getRiggerTicketsData,
  getTransportationTicketsData,
} from "../redux/actions/TicketSAction";
import ReactLoading from "react-loading";
import PrimaryBtn from "./PrimaryBtn";

const TranportationFilterCard = ({ Name, Address, Date }) => {
  const [data, setData] = useState({});
  const transportationTickets = useSelector((state) => state?.ticketsData);
  const dispatch = useDispatch();
  const newData = transportationTickets?.transportationTicketsData?.map(
    (v) => ({
      value: v.customerName,
      label: v.customerName,
    })
  );
  const newAdress = transportationTickets?.transportationTicketsData?.map(
    (v) => ({
      value: v.billingAddress,
      label: v.billingAddress,
    })
  );
  const uniqueName = newData.filter((obj, index) => {
    return index === newData.findIndex((o) => obj.value === o.value);
  });
  const uniqueAdress = newAdress.filter((obj, index) => {
    return index === newAdress.findIndex((o) => obj.value === o.value);
  });


  useEffect(() => {
    dispatch(getTransportationTicketsData());
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
              setData({ ...data, customerName: e?.label });
            }}
            placeholder={data.customerName == undefined ? "Select" : data?.customerName}
          />
        </div>
        <div className="sub-container">
          <span className="title">{Address}</span>
          <Select
            className={"dropDownStyling"}
            options={uniqueAdress}
            onChange={(e) => {
              setData({ ...data, billingAddress: e?.label });
            }}
            placeholder={
              data.billingAddress == "" ? "Search Address" : data.billingAddress
            }
          />
        </div>
        <div className="sub-container">
          <span className="title">{Date}</span>
          <input
            onChange={(e) => {
              setData({ ...data, dateforcustomer: e.target.value });
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
              transportationTickets?.isTransportationTicketsLoading ? (
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
                data?.address != "" ||
                data?.jobDate != ""
              ) {
                dispatch(filterTransportationTicketsData(data));
              } else {
                alert("Select any of the type!");
              }
            }}
          />
          {data.customerName ||
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
                  dispatch(getTransportationTicketsData());
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

export default TranportationFilterCard;
