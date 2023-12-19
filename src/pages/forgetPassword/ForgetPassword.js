import React, { useState } from "react";
import "../login/Login.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import PasswordInput from "../../components/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/actions/AuthActions";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loader = useSelector((state) => state?.auth?.isLoading);

  const [userCredentials, setUserCredentials] = useState({
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleChangePassword = () => {
    // var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    // if (reg.test(userCredentials.userEmail) == false) {
    //   alert("Email is Not Correct");
    // } else if (
    //   userCredentials.userPassword !== userCredentials.confirmPassword
    // ) {
    //   alert("Password is not Match!");
    // } else {
      dispatch(changePassword(userCredentials, navigate));
    // }
  };

  return (
    <>
      <div className="parent-div">
        <div className="main-div">
          <h2
            style={{
              fontSize: 29,
              fontWeight: "700",
              textAlign: "center",
              marginTop: 24,
            }}
          >
            Forget Password
          </h2>
          <div style={{ marginLeft: 35 }}>
            <label className="title">Email Address</label>
            <CustomInput
              type={"text"}
              placeholder={"Enter Your Email"}
              inputStyling={"input-style"}
              onChange={handleChange}
              value={userCredentials.userEmail}
              name={"userEmail"}
              id={"userEmail"}
            />
          </div>
          <div style={{ marginLeft: 35 }}>
            <label className="title">New Password</label>
            <PasswordInput
              showPassword={"show-paswword"}
              inputmain={"main-styling"}
              placeholder={"Enter New Password"}
              passwordStly={"input-style"}
              onchange={handleChange}
              value={userCredentials.userPassword}
              name={"userPassword"}
              id={"userPassword"}
            />
          </div>
          <div style={{ marginLeft: 35 }}>
            <label className="title">Confirm Password</label>
            <PasswordInput
              showPassword={"show-paswword"}
              inputmain={"main-styling"}
              placeholder={"Enter Confirm Password"}
              passwordStly={"input-style"}
              onchange={handleChange}
              value={userCredentials.confirmPassword}
              name={"confirmPassword"}
              id={"confirmPassword"}
            />
          </div>
          <CustomButton
            onclick={() => {
              handleChangePassword();
            }}
            title={
              loader ? (
                <ReactLoading
                  type="spin"
                  color={"white"}
                  height={59}
                  width={36}
                  className="loading"
                  delay={4}
                />
              ) : (
                "Change Password"
              )
            }
            buttonStyle={"btn-style"}
          />
          <br />
          <CustomButton
            onclick={() => {
              navigate("/");
            }}
            title={"Go to LogIn"}
            buttonStyle={"btn-style"}
          />
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
