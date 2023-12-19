const NotificationModal = ({}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "2px",
        right: "1px",
        fontSize: "15px",
        textAlign: "center",
        width: "25%",
        boxShadow: "1px 2px 9px #000",
        borderRadius: 6,
        backgroundColor: "#dc2f2b",
        color: "#ffffff",
      }}
    >
      <div>
        <p>Wait! Action is Proceeding</p>
      </div>
    </div>
  );
};

export default NotificationModal;
