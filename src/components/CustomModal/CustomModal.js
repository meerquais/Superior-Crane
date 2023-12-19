import React, { useEffect, useState } from "react";
import "./CustomModal.css";
import { AiFillCloseCircle } from "react-icons/ai";
const Modal = ({ open, onClose, arrr,isLoader }) => {
  const [isLoading, setIsLoading] = useState(false);



  if (!open) return null;
  return (
    <div arrayImag={arrr} onClick={onClose} isLoader={isLoader} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
        isLoader={false}
      >
        <div className="modalRight">
          <AiFillCloseCircle
            style={{
              position: "absolute",
              top: "0px",
              right: "2px",
              cursor: "pointer",
            }}
            size={18}
            onClick={onClose}
          />
          <div className="images_cont">
            {arrr?.map((item, index) => {
              return (
                <>
                  {item == null ? (
                    <>{index == 0 ? <h1>No Image Found</h1> : null}</>
                  ) : (
                    <img
                      src={`https://test.scserver.org/files/${item}`}      className="img"
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
