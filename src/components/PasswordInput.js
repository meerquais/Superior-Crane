import React, { useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

const PasswordInput = ({
  inputmain,
  value,
  onchange,
  placeholder,
  passwordStly,
  showPassword,
  name,
  id,
  mtleft,
}) => {
  const [isPassword, setIspassword] = useState(false);

  return (
    <div className={inputmain}>
      <input
        type={!isPassword ? "password" : "text"}
        value={value}
        onChange={onchange}
        placeholder={placeholder}
        className={passwordStly}
        name={name}
        id={id}
      />
      <div
        className={showPassword}
        onClick={() => {
          setIspassword(!isPassword);
        }}
      >
        {!isPassword ? (
          <BsFillEyeSlashFill
            size={25}
            color="#fff"
            style={{ position: "relative", top: 9, left: mtleft ? mtleft : 6 }}
          />
        ) : (
          <BsFillEyeFill
            size={25}
            color="#fff"
            style={{ position: "relative", top: 9, left: mtleft ? mtleft : 6 }}
          />
        )}
      </div>
    </div>
  );
};
export default PasswordInput;
