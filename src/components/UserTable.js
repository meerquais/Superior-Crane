import { useDispatch, useSelector } from "react-redux";
import { Images } from "../utils/imsges";
import NotificationModal from "./WarningModal";
import ReactLoading from "react-loading";
import { useLocation } from "react-router-dom";
import { updateUser, updateWebAdmin } from "../redux/actions/UserAction";

const UserTable = ({ Serial, Name, Email }) => {
  const userData = useSelector((state) => state?.usersData);
  const location = useLocation();
  const dispatch = useDispatch();
  const items = JSON.parse(localStorage.getItem("items"));

  return (
    <>
      {userData?.isUserLoading ? <NotificationModal /> : null}
      <div
        style={{
          display: "block",
          overflowY: "scroll",
          height: "30rem",
          overflowAnchor: "none",
        }}
      >
        {userData?.isUserLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10rem",
              marginTop: "10rem",
            }}
          >
            <ReactLoading
              type="spin"
              color={"red"}
              height={100}
              width={100}
              className="loading"
              delay={4}
            />
          </div>
        ) : (
          <>
            {userData?.usersData?.length == 0 ? (
              <>
                <h1 style={{ textAlign: "center" }}>
                  No Results Found! &#9888;
                </h1>
              </>
            ) : (
              <>
                <table
                  cellSpacing={0}
                  style={{
                    border: "1px solid #F2F2F2",
                    borderRadius: "2px",
                    width: "99%",
                    borderRight: 3,
                  }}
                >
                  <tr>
                    <th style={userTbaleStyling.thStyling}>{Serial}</th>
                    <th style={userTbaleStyling.thStyling}> {Name}</th>
                    <th style={userTbaleStyling.thStyling}>{Email}</th>
                    <th style={userTbaleStyling.thStyling1}>Status</th>
                  </tr>
                  {userData?.usersData?.map((item, index) => {
                    return (
                      <>
                        {items?.name != item?.name ? (
                          <tr key={index}>
                            <td style={userTbaleStyling.tdStyling1}>
                              {index +1}
                            </td>
                            <td style={userTbaleStyling.tdStyling}>
                              {item?.name}
                            </td>
                            <td style={userTbaleStyling.tdStyling}>
                              {item?.email}
                            </td>
                            <td style={userTbaleStyling.thStyling1}>
                              <input
                                onClick={() => {
                                  if (location.pathname == "/admin") {
                                    dispatch(
                                      updateWebAdmin(
                                        item?._id,
                                        item?.status == "Enable"
                                          ? "Disable"
                                          : "Enable"
                                      )
                                    );
                                  } else {
                                    if (location.pathname == "/managers") {
                                      dispatch(
                                        updateUser(
                                          item?._id,
                                          item?.status == "Enable"
                                            ? "Disable"
                                            : "Enable",
                                          "Manager"
                                        )
                                      );
                                    } else {
                                      dispatch(
                                        updateUser(
                                          item?._id,
                                          item?.status == "Enable"
                                            ? "Disable"
                                            : "Enable",
                                          "User"
                                        )
                                      );
                                    }
                                  }
                                }}
                                type="checkbox"
                                checked={
                                  item?.status == "Enable" ? true : false
                                }
                              />
                            </td>
                          </tr>
                        ) : null}
                      </>
                    );
                  })}
                </table>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

const userTbaleStyling = {
  thStyling: {
    padding: "10px",
    borderRight: "1px solid #F2F2F2",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "600",
    lineHeight: "2px",
  },
  thStyling1: {
    padding: "10px",
    borderRight: "1px solid #F2F2F2",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "600",
    lineHeight: "2px",
    width: 60,
  },
  tdStyling: {
    padding: "15px",
    borderRight: "1px solid #F2F2F2",
    textAlign: "left",
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "12px",
  },
  tdStyling1: {
    padding: "15px",
    borderRight: "1px solid #F2F2F2",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "12px",
    width: 60,
  },
  images: {
    paddingTop: 9,
    marginLeft: 4,
  },
};

export default UserTable;
