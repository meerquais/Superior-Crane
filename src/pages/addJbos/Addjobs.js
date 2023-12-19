import AddJobsCard from "../../components/AddJobsCard";
import './Addjobs.css';

const AddJobs = () => {
    return (<>
        <h3 style={{marginLeft:'2rem'}}>ADD JOB</h3>
        <div className="main">
            <div className="main-container">
                <AddJobsCard
                    rightStying={'right-styling'}
                    leftStling={'left-styling'}
                    inputFoucsed={'input-Foucsed'}
                    checkBoxStyl={'checkBoxStyl'}
                />
            </div>
        </div>
    </>
    )
}

export default AddJobs;