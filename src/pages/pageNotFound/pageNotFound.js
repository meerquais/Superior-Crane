import "../login/Login.css";

import CustomButton from "../../components/CustomButton";

import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign:'center'
      }}
    >
      <h1>Page!<br/>Not Found</h1>
      <CustomButton 
       onclick={()=>{
        navigate('/')
       }}
        title={"go to home"} buttonStyle={"not-Found"} />
    </div>
  );
};

export default PageNotFound;
