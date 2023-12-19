export const USER_LOGIN = "USER_LOGIN";
export const LOADING_STATE = "LOADING_STATE";
export const FORGET_PASSWORD = "FORGET_PASSWORD";
export const CHNAGE_PASSWORD_LOADING = "CHNAGE_PASSWORD_LOADING";
export const LOGOUT_USER = "LOGOUT_USER";
export const SEND_OTP_SUCCESS = "SEND_OTP_SUCCESS";
export const SEND_OTP_FAILURE = "SEND_OTP_FAILURE";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILURE = "VERIFY_OTP_FAILURE";

const initialize_states = {
  userDetail: [],
  isLoading: false,
  forgetPassword: "",
  isChangePasswordLoading: false,
  logOut: [],
  sendOtpResponse: null,
  verifyOtpResponse: null,
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
        forgetPassword: action.payload,
      };
    case CHNAGE_PASSWORD_LOADING:
      return {
        ...state,
        isChangePasswordLoading: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        logOut: action.payload,
      };
    case SEND_OTP_SUCCESS:
      return {
        ...state,
        sendOtpResponse: { success: true, data: action.payload },
      };
    case SEND_OTP_FAILURE:
      return {
        ...state,
        sendOtpResponse: { success: false, error: action.payload },
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyOtpResponse: { success: true, data: action.payload },
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        verifyOtpResponse: { success: false, error: action.payload },
      };
    default:
      return state;
  }
};

export default AuthReducer;
