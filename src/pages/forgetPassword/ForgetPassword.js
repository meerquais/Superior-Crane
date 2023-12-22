import React, { useState, useEffect } from "react";
import "../login/Login.css";
import CustomButton from "../../components/CustomButton";
import PasswordInput from "../../components/PasswordInput";
import OtpSend from "../otpsend/OtpSend";
import OptVerify from "../otpverify/OptVerify";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, sendOtp, verifyOtp } from "../../redux/actions/AuthActions";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loader = useSelector((state) => state?.auth?.isLoading);

  const [userCredentials, setUserCredentials] = useState({
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });

  const [verificationState, setVerificationState] = useState({
    emailInLocalStorage: false,
    otpVerified: false,
  });
  const [triggerEffect, setTriggerEffect] = useState(0);

  const triggerEffectUpdate = () => {
    setTriggerEffect((prev) => prev + 1);
  };

  useEffect(() => {
    const emailInLocalStorage = localStorage.getItem("items") !== null;
    const storedData = JSON.parse(localStorage.getItem("items")) || {};
    const otpVerified = storedData.otp || false;

    setVerificationState({ emailInLocalStorage, otpVerified });

    if (emailInLocalStorage && otpVerified) {
      setVerificationState({ emailInLocalStorage: true, otpVerified: true });
    }
  }, [triggerEffect]);

  useEffect(() => {
    // Function to handle storage events
    const handleStorageChange = () => {
      triggerEffectUpdate();
    };

    // Function to handle beforeunload event
    const handleBeforeUnload = () => {
      // Remove localStorage when the user closes the tab or changes the page
      // localStorage.removeItem("items");
    };

    // Attach the event listener for storage change
    window.addEventListener("storage", handleStorageChange);

    // Attach the event listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    const intervalId = setInterval(triggerEffectUpdate, 3000);

    // Detach the event listeners when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(intervalId);
    };

    // Trigger the effect once when the component mounts
    triggerEffectUpdate();
  }, []); // Empty dependency array means it runs once after the initial render

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    const { userEmail } = userCredentials;

    try {
      const response = await dispatch(sendOtp(userEmail, navigate));
      if (response.status === 200) {
        setVerificationState({ emailInLocalStorage: true, otpVerified: false });
        triggerEffectUpdate();
        alert("OTP sent successfully");
      } else if (response.status === 422) {
        alert("Validation failed: " + response.data.message);
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error in handleSendOtp:", error);
      alert("An error occurred while sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    const { userEmail, otp } = userCredentials;

    try {
      const response = await dispatch(verifyOtp(userEmail, otp, navigate));
      if (response.status === 200) {
        setVerificationState({ emailInLocalStorage: true, otpVerified: true });
        triggerEffectUpdate();
        alert("OTP verified successfully");
      } else if (response.status === 422) {
        alert("Validation failed: " + response.data.message);
      } else {
        alert("Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error in handleVerifyOtp:", error);
      alert("An error occurred while verifying OTP");
    }
  };

  const handleChangePassword = () => {
    dispatch(changePassword(userCredentials, navigate));
  };

  return (
    <div className="parent-div" style={{ margin: 0, padding: 0 }}>
      <div className="main-div" >
        {(verificationState.emailInLocalStorage && verificationState.otpVerified) ? (
          <>
            <h2 style={{
              fontSize: 29,
              fontWeight: "700",
              textAlign: "center",
              marginTop: 24,
            }}>Forget Password</h2>
            <div className="existing-content">
              {/* <div style={{ marginLeft: 35 }}>
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
              </div> */}
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
            </div>
            <CustomButton
              onclick={() => {
                handleChangePassword();
              }}
              title={
                loader ? (
                  <ReactLoading
                    type="spin"
                    color="white"
                    height={59}
                    width={36}
                    className="loading"
                    delay={4}
                  />
                ) : (
                  "Change Password"
                )
              }
              buttonStyle="btn-style"
            />
            <br />
          </>
        ) : (
          (verificationState.emailInLocalStorage && !verificationState.otpVerified) ? (
            <OptVerify
              userCredentials={userCredentials}
              onVerify={handleVerifyOtp}
              onChange={handleChange}
            />
          ) : (
            <OtpSend
              userCredentials={userCredentials}
              onSendOtp={handleSendOtp}
              onChange={handleChange}
            />
          )
        )}

        <CustomButton
          onclick={() => {
            navigate("/");
          }}
          title="Go to LogIn"
          buttonStyle="btn-style"
        />
      </div>
    </div>
  );
};

export default ForgetPassword;
