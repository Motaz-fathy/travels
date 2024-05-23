import produce from "immer";
import {
  LOAD_LOGIN,
  SUCCESS_LOGIN,
  FALID_LOGIN,
  LOAD_VERIFI_OTP,
  SUCCESS_VERIFI_OTP,
  FAIL_VERIFI_OTP,
  LOAD_VALIDATE_OTP,
  SUCCESS_VALIDATE_OTP,
  FAIL_VALIDATE_OTP,
  LOAD_SEND_OTP,
  SUCCESS_SEND_OTP,
  FAIL_SEND_OTP,
  LOAD_RESEND_OTP,
  SUCCESS_RESEND_OTP,
  FAIL_RESEND_OTP,
  LOGOUT,
  SET_TRIP_TYPE,
  LOAD_REGISTER,
  SUCCESS_REGISTER,
  FAIL_REGISTER,
  LOAD_DELETE_ACC,
  SUCCESS_DELETE_ACC,
  FAIL_DELETE_ACC
} from "../../actions/types";

const initialState = {
  loading: false,
  data: [],
  error: null
};
// delete acc 
export const DeleteAccReducer = (state = {
loadingDelete : false ,
message : null ,
errorDelete : null 
} , action ) => {
  switch (action.type) {
    case LOAD_DELETE_ACC:
       return {loading : true , message : null , error : null }
    case SUCCESS_DELETE_ACC : 
       return {loading : false , message : action.payload }
    case FAIL_DELETE_ACC : 
       return {loading : false , error : action.payload }   
  
    default: return {...state }
  }
}
// register reducer 
export const RegisterReducer = (state = {
  loading : false ,
  data : null ,
  error : null 
} , action ) => {
  switch (action.type) {
    case LOAD_REGISTER:
       return {loading : true , data : null , error : null }
    case SUCCESS_REGISTER : 
       return {loading : false , data : action.payload }
    case FAIL_REGISTER : 
       return {loading : false , error : action.payload }   
  
    default: return {...state }
  }
}
export const LoginReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_LOGIN:
        draft.loading = true;
        draft.error = null;
        break;
      case SUCCESS_LOGIN:
      case SUCCESS_VERIFI_OTP:
      case SUCCESS_VALIDATE_OTP:
      case SUCCESS_SEND_OTP:
      case SUCCESS_RESEND_OTP:
        draft.loading = false;
        draft.data = action.payload;
        draft.error = null;
        break;
      case FALID_LOGIN:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case LOGOUT:
        draft.loading = false;
        draft.data = [];
        draft.error = null;
        break;
      default:
        break;
    }
  });
};

const initOtp = {
  loading: false,
  data: null,
  error: null
};
export const otpReducer = (state = initOtp, action) => {
  switch (action.type) {
    case LOAD_VERIFI_OTP:
    case LOAD_VALIDATE_OTP:
    case LOAD_SEND_OTP:
    case LOAD_RESEND_OTP:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SUCCESS_VERIFI_OTP:
    case SUCCESS_VALIDATE_OTP:
    case SUCCESS_SEND_OTP:
    case SUCCESS_RESEND_OTP:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case FAIL_VERIFI_OTP:
    case FAIL_VALIDATE_OTP:
    case FAIL_SEND_OTP:
    case FAIL_RESEND_OTP:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LOGOUT:
      return {
        loading: false,
        data: null,
        error: null
      };

    default:
      return state;
  }
};

export const tripReducer = (
  state = {
    tripType: "oneWay" // Default value
  },
  action
) => {
  switch (action.type) {
    case SET_TRIP_TYPE:
      return {
        ...state,
        tripType: action.payload
      };
    default:
      return state;
  }
};
