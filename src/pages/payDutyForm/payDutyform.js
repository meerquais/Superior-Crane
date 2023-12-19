import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import PayDutyFilterCard from "../../components/PayDutyFilterCard";
import PayDutyFormTabel from "../../components/PayDutyForm";
import { PayDutyFormDummyData, optionList } from "../../utils/dummyData";
import ReactLoading from "react-loading";
import { downloadTicketsData } from "../../redux/actions/TicketSAction";

const PayDutyForm = () => {
  return (
    <div style={{
      marginTop: '2rem'
    }}>
      <div className="title-class">
        <h3>FILTER</h3>
      </div>
      <div >
        <PayDutyFilterCard
          Name={"Officer Name"}
          Address={"Address"}
          Date={"Date"}
        />
      </div>
      <h3 style={{ marginLeft: '2.5rem' }}>PAY DUTY FORM</h3>
      <div>
        <PayDutyFormTabel payDutyData={PayDutyFormDummyData} />
      </div>
    </div>
  )
}

export default PayDutyForm;