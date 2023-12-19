export const GET_ALLJOB = "GET_ALL_JOB";
export const LOADING_STATE = "LOADING_STATE";
export const DAILY_OR_WEKLY_JOBS = "DAILY_OR_WEKLY_JOBS";
export const JOB_EDIT = "JOB_EDIT";
export const JOB_EDIT_LOADING = "JOB_EDIT_LOADING";
export const FORWARD_WEEK_JOBS = 'FORWARD_WEEK_JOBS';


const initialize_states = {
  job: [],
  isLoading: false,
  isDailyorWeekly: "",
  jobsEditRes: [],
  isJobEditLoding:false,
  ForwardWeekData:[]
};

const DahsBoardReducer = (state = initialize_states, action) => {
  switch (action.type) {
    case GET_ALLJOB:
      return {
        ...state,
        job: action.payload,
      };
    case LOADING_STATE:
      return {
        ...state,
        isLoading: action.payload,
      };
    case JOB_EDIT:
      return{
        ...state,
        jobsEditRes:action.payload
      }
      case JOB_EDIT_LOADING:
        return{
          ...state,
          isJobEditLoding:action.payload
        }
        case FORWARD_WEEK_JOBS:
          return{
            ...state,
            ForwardWeekData:action.payload
          }
    default: {
      return state;
    }
  }
};

export default DahsBoardReducer;
