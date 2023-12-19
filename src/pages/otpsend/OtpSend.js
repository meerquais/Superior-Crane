import React, { useState } from "react";
import "../login/Login.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import PasswordInput from "../../components/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../redux/actions/AuthActions"; // Import the correct action
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

const OtpSend = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loader = useSelector((state) => state?.auth?.isLoading);

  const [userCredentials, setUserCredentials] = useState({
    userEmail: "",
  });

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSendOtp = () => {
    // Add any validation logic if needed
    dispatch(sendOtp(userCredentials.userEmail, navigate));
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
          <CustomButton
            onclick={handleSendOtp}
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
                "Send Otp"
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

export default OtpSend;
