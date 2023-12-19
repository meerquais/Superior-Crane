import { useEffect, useState } from "react";
import userImage from "../assets/icons/399052.png";
import WebLogo from "../assets/icons/Logo.png";
import UserModal from "./UserModal";
import { Images } from "../utils/imsges";
import { useNavigate } from "react-router-dom";

const Header = ({
  headerStyle,
  webLogoStyle,
  userProfileStyle,
  updownStyle,
}) => {
  const [isshow, setIshow] = useState(false);
  const navigate = useNavigate();
  const items = JSON.parse(localStorage.getItem("items"));

  return (
    <div  className={headerStyle}>
      <div>
        <div
          style={{
            overflow: "hidden",
            height: "5rem",
            width: "15rem",
            backgroundColor: "#DC2F2B",
            cursor: "pointer",
          }}
        >
          <img
            onClick={() => {
              navigate("/");
            }}
            src={WebLogo}
            className={webLogoStyle}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <p
          onClick={() => setIshow(!isshow)}
          style={{ cursor: "pointer" }}
          className={userProfileStyle}
        >
          {items?.name ? items?.name : "User"}
        </p>
        <div onClick={() => setIshow(!isshow)} className={updownStyle}>
          <img src={Images.blcDownArrow} />
        </div>
        {isshow ? <UserModal /> : null}
      </div>
    </div>
  );
};

export default Header;
