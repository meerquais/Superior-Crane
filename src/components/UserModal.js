import React, { useState } from "react";
import ChangePasswordModal from "./CustomModal/ChangePassword";
import { useDispatch } from "react-redux";
import { signOutUser } from "../redux/actions/AuthActions";
import { useNavigate } from "react-router-dom";
const UserModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        top: 65,
        right: 5,
        width: "10rem",
        boxShadow: "1px 2px 9px #000",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        cursor: "pointer",
      }}
    >
      <p
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Change Password
      </p>
      <ChangePasswordModal
        open={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
      />
      <hr color="red" style={{ width: "8rem" }} />
      <p
        onClick={() => {
          dispatch(signOutUser(navigate));
        }}
      >
        {"Logout"}
      </p>
    </div>
  );
};

export default UserModal;
