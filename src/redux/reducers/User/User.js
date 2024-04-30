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
  FAIL_RESEND_OTP
} from "../../actions/types";

const initialState = {
  loading: false,
  data: [],
  error: null
};

export const LoginReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_LOGIN:
        draft.loading = true;
        draft.error = null;
        break;
      case SUCCESS_LOGIN:
        draft.loading = false;
        draft.data = action.payload;
        draft.error = null;
        break;
      case FALID_LOGIN:
        draft.loading = false;
        draft.error = action.payload;
        break;
      default:
        break;
    }
  });
};

const initOtp = {
    loading: false,
    data: null,
    error: null,
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
          error: null,
        };
      case SUCCESS_VERIFI_OTP:
      case SUCCESS_VALIDATE_OTP:
      case SUCCESS_SEND_OTP:
      case SUCCESS_RESEND_OTP:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case FAIL_VERIFI_OTP:
      case FAIL_VALIDATE_OTP:
      case FAIL_SEND_OTP:
      case FAIL_RESEND_OTP:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };