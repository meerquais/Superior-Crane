import { useDispatch } from "react-redux";
import JoblistCard from "../../components/JobListCard";
import UserTable from "../../components/UserTable";
import { Manager } from "../../utils/dummyData";
import "./Manager.css"
import { getUsersDetail } from "../../redux/actions/UserAction";

const Managers =() => {
  const dispatch = useDispatch()
    return(
      <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
      <h3>MANAGERS</h3>
        <span
        onClick={()=>{
          dispatch(getUsersDetail("Manager"))
        }}
          style={{
            fontSize: "1.5rem",
            marginRight: "2.3rem",
            cursor:'pointer'
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
            Name={"Manager Name"}
            Email={"Email Address"}
            data={Manager}
            />
      </div>
            </>
    )
}

export default Managers;