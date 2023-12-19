import React, { useState } from "react";
import CustomInput from "./CustomInput";
import PrimaryBtn from "./PrimaryBtn";
import { useDispatch, useSelector } from "react-redux";
import { createRolesforUsers } from "../redux/actions/UserAction";
import ReactLoading from "react-loading";

const AddUser = ({
  inputContainer,
  spanStyling,
  inputStyling,
  selectStyling,
}) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const userLoader = useSelector((state) => state?.usersData);
  const handleAddUser = () => {
    dispatch(createRolesforUsers(data));
  };
  return (
    <div>
      <div className={inputContainer}>
        <div>
          <span className={spanStyling}>Name</span>
          <CustomInput
            type={"text"}
            inputStyling={inputStyling}
            placeholder={"Enter User Name Here"}
            value={data.name}
            name={"name"}
            id={"name"}
            onChange={handleChange}
          />
        </div>
        <div>
          <span className={spanStyling}>Password</span>
          <CustomInput
            placeholder={"Enter Password Here"}
            type={"password"}
            inputStyling={inputStyling}
            value={data.password}
            name={"password"}
            onChange={handleChange}
            id={"password"}
          />
          {data.password !== data.confirmPassword ? (
            <span
              style={{
                fontSize: "9px",
                color: "red",
                bottom: "0.8rem",
                position: "relative",
              }}
            >
              Wrong Password &#128272;
            </span>
          ) : null}
        </div>
      </div>
      <div className={inputContainer}>
        <div>
          <span className={spanStyling}>Email</span>
          <CustomInput
            type={"text"}
            placeholder={"Enter Email Address Here"}
            inputStyling={inputStyling}
            value={data.email}
            name={"email"}
            id={"email"}
            onChange={handleChange}
          />
        </div>
        <div>
          <span className={spanStyling}> Confirm Password</span>
          <CustomInput
            placeholder={"Enter Confirm Password Here"}
            type="password"
            inputStyling={inputStyling}
            value={data.confirmPassword}
            name={"confirmPassword"}
            id={"confirmPassword"}
            onChange={handleChange}
          />
          {data.password !== data.confirmPassword ? (
            <span
              style={{
                fontSize: "9px",
                color: "red",
                bottom: "0.8rem",
                position: "relative",
              }}
            >
              Check Password &#128272;
            </span>
          ) : null}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span className={spanStyling}>Role</span>
        <select
          className={selectStyling}
          value={data.role}
          id={"role"}
          name="role"
          onChange={handleChange}
        >
          <option value="" disabled selected hidden>
            Select your option
          </option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <PrimaryBtn
          onclick={handleAddUser}
          width={156}
          height={40}
          title={
            userLoader?.isUserLoading ? (
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
              "Add New"
            )
          }
        />
      </div>
    </div>
  );
};

export default AddUser;
