import React from "react";

const CustomInput = ({type,value,onChange,inputStyling,placeholder,style,name,id,}) => {
    return (
        <div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={inputStyling}
                style={style}
                name={name}
                id={id}
            />
        </div>
    )
}
export default CustomInput;