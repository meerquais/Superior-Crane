import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import PasswordInput from "../../components/PasswordInput";
import "./Login.css";
import { BiLockAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { signUser } from "../../redux/actions/AuthActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import NotificationModal from "../../components/WarningModal";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector((state) => state?.auth?.isLoading);

  const [userCredentials, setUserCredentials] = useState({
    userEmail: "",
    userPassword: "",
  });

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    dispatch(signUser(userCredentials));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {loader ? <NotificationModal /> : null}
      <form onSubmit={handleSubmit}>
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
              Login
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
            <div style={{ marginLeft: 35 }}>
              <label className="title">Password</label>
              <PasswordInput
                showPassword={"show-paswword"}
                inputmain={"main-styling"}
                placeholder={"Enter Your Password"}
                passwordStly={"input-style"}
                onchange={handleChange}
                value={userCredentials.userPassword}
                name={"userPassword"}
                id={"userPassword"}
              />
            </div>
            <div>
              <CustomButton
              type={"submit"}
                onclick={() => handleLogin()}
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
                    "Login"
                  )
                }
                buttonStyle={"btn-style"}
              />
            </div>
            <div className="forget-pass">
              <BiLockAlt size={20} style={{ marginRight: 13 }} />
              <p
                className="forget-pass-title"
                onClick={() => {
                  navigate("/sendotp");
                }}
              >
                Forget Your password
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default Login;
