import AddUser from "../../components/AddUserCard";
import './User.css'

const User = () => {
  return (
    <>
      <h3>ADD USER</h3>
    <div className="main-user">
      <div className="userCard-Styling">
        <AddUser
          inputContainer={"input-container"}
          selectStyling={"selectStyling"}
          spanStyling={"spanStyling"}
          inputStyling={"inputStyling"}        />
      </div>
    </div>
    </>
  );
};

export default User;
