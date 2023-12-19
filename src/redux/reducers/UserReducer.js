export const GET_USERS = "GET_USERS";
export const USER_LOADER = "USER_LOADER";
export const SEARCH_CHOCES = "SEARCH_CHOCES";
export const CHANGE_USER_STATUS = "CHANGE_USER_STATUS";
export const POST_JOB = "POST_JOB";
export const JOB_IMAGE_UPLOAD = "JOB_IMAGE_UPLOAD";
export const FILTER_JOB = "FILTER_JOB";
export const CREATE_NEW_ROLES ='CREATE_NEW_ROLES';

const initialize_states = {
  usersData: [],
  isUserLoading: false,
  searchString: {},
  changeStatus: [],
  postJob: [],
  filterJob: {},
  imageUploadMsg:'',
  createNewRoles:[]
};

const UserReducer = (state = initialize_states, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        usersData: action.payload,
      };
    case USER_LOADER:
      return {
        ...state,
        isUserLoading: action.payload,
      };
    case SEARCH_CHOCES:
      return {
        ...state,
        searchString: action.payload,
      };
    case CHANGE_USER_STATUS:
      return {
        ...state,
        changeStatus: action.payload,
      };
    case POST_JOB:
      return {
        ...state,
        postJob: action.payload,
      };
    case FILTER_JOB:
      return {
        ...state,
        filterJob: action.payload,
      };
      case JOB_IMAGE_UPLOAD:
      return {
        ...state,
       imageUploadMsg : action.payload,
      };
      case CREATE_NEW_ROLES:
        return{
          ...state,
          createNewRoles:action.payload
        }
    default: {
      return state;
    }
  }
};

export default UserReducer;
