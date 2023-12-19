

const CustomButton = ({title,onclick,buttonStyle,type}) =>{
    return(
        <div>
            <button type={type} className={buttonStyle} onClick={onclick} >{title}</button>
        </div>
    )
}
export default CustomButton