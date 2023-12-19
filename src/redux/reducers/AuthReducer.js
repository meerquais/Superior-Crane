export const USER_LOGIN = "USER_LOGIN";
export const LOADING_STATE = "LOADING_STATE";
export const FORGET_PASSWORD = "FORGET_PASSWORD";
export const CHNAGE_PASSWORD_LOADING = "CHNAGE_PASSWORD";
export const LOGOUT_USER = "LOGOUT_USER";

const initialize_states = {
  userDetail: [],
  isLoading: false,
  forgetPassword:'',
  isChangePasswordLoading:false,
  logOut:[]
};

const AuthReducer = (state = initialize_states, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userDetail: action.payload,
      };
    case LOADING_STATE:
      return {
        ...state,
        isLoading: action.payload,
      };
      case FORGET_PASSWORD:
        return {
          ...state,
          forgetPassword:action.payload
        }
        case CHNAGE_PASSWORD_LOADING:
          return {
            ...state,
            isChangePasswordLoading:action.payload
          }
          // case LOGOUT_USER:
          //   return {
          //     ...state,
          //     logOut:action.payload
          //   }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
