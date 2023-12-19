

const PrimaryBtn = ({ width, height, onclick, title, mtTop, stylbtn, }) => {
    return (
        <div style={stylbtn} >
            <button

                style={{
                    width: width,
                    height: height,
                    borderRadius: 5,
                    backgroundColor: "#DC2F2B",
                    color: '#fff',
                    borderColor: 'transparent',
                    fontSize: 14,
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginTop: mtTop,
                    textTransform:"uppercase"
                }}
                onClick={onclick}>{title}</button>
        </div>
    )
}

export default PrimaryBtn