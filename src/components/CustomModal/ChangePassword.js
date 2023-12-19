import React, { useState } from "react";
import "./CustomModal.css";
import { AiFillCloseCircle } from "react-icons/ai";
import PasswordInput from "../PasswordInput";
import PrimaryBtn from "../PrimaryBtn";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePassword,
} from "../../redux/actions/AuthActions";

const ChangePasswordModal = ({ open, onClose, arrr }) => {
  const [userCredentials, setUserCredentials] = useState({
    userPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };
  const loader = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  if (!open) return null;
  return (
    <div arrayImag={arrr} onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <div onClick={onClose}>
            <AiFillCloseCircle
              style={{
                position: "absolute",
                top: "10px",
                right: "12px",
                cursor: "pointer",
              }}
              size={18}
            />
          </div>
          <h1>Update Password</h1>
          <div
            style={{
              marginLeft: "3rem",
            }}
          >
            <div className="single-input">
              <span>New Password</span>
              <PasswordInput
                mtleft={1}
                showPassword={"show-paswword"}
                inputmain={"main-styling"}
                placeholder={"New Password"}
                passwordStly={"input-style"}
                onchange={handleChange}
                value={userCredentials.userPassword}
                name={"userPassword"}
                id={"userPassword"}
              />
            </div>
            <div className="single-input">
              <span>Confirm New Password</span>
              <PasswordInput
                mtleft={1}
                showPassword={"show-paswword"}
                inputmain={"main-styling"}
                placeholder={"Consfirm new password"}
                passwordStly={"input-style"}
                onchange={handleChange}
                value={userCredentials.confirmPassword}
                name={"confirmPassword"}
                id={"confirmPassword"}
              />
            </div>
          </div>
          <PrimaryBtn
            title={
              loader?.isChangePasswordLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ReactLoading
                    type="spin"
                    color={"white"}
                    height={59}
                    width={36}
                    delay={4}
                  />
                </div>
              ) : (
                "Update Password"
              )
            }
            width={"18rem"}
            height={"3rem"}
            onclick={() => {
              dispatch(updatePassword(userCredentials));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
