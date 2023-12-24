import { useDispatch } from "react-redux";
import JoblistCard from "../../components/JobListCard";
import UserTable from "../../components/UserTable";
import { DailyUser } from "../../utils/dummyData";
import "./BasicUser.css";
import { getUsersDetail } from "../../redux/actions/UserAction";

const BasicUser = ({ role }) => {
  const dispatch = useDispatch();
  const fetchUsers = () => {
    dispatch(getUsersDetail(role));
  };
  return (
    <div className="main-basic">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 >BASIC USER
        </h3>
        <span
         onClick={fetchUsers("BasicUser")}
          style={{
            fontSize: "1.5rem",
            marginRight: "2.3rem",
            cursor: "pointer",
          }}
        >
          &#128260;
        </span>
      </div>
      <div className="container">
        <div className="sec-Container">
          <JoblistCard />
        </div>
        <UserTable
          Serial={"Serial#"}
          Name={"Basic User Name"}
          Email={"Email Address"}
          data={DailyUser}
        />
      </div>
    </div>
  );
};

export default BasicUser;
