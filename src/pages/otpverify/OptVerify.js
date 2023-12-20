import React, { useState } from "react";
import "../login/Login.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import PasswordInput from "../../components/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../redux/actions/AuthActions";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

const OptVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loader = useSelector((state) => state?.auth?.isLoading);

  const [userCredentials, setUserCredentials] = useState({
    userEmail: "", // Add userEmail field to the state
    otp: "", // Add OTP field to the state
  });

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleVerifyOtp = () => {
    dispatch(verifyOtp(userCredentials, navigate));
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
            OTP Verification
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
            <label className="title">Enter Your OTP</label>
            <CustomInput
              type={"text"}
              placeholder={"Enter Your OTP"}
              inputStyling={"input-style"}
              onChange={handleChange}
              value={userCredentials.otp}
              name={"otp"} // Match the name with the state key
              id={"otp"}
            />
          </div>
          <CustomButton
            onclick={handleVerifyOtp}
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
                "Verify OTP"
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

export default OptVerify;
