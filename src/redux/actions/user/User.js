import axios from "axios";
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
  FAIL_DELETE_ACC,
  LOAD_UPDATE_ACC,
  SUCCESS_UPDATE_ACC,
  FAIL_UPDATE_ACC
} from "../types";
export const LoginAction = (phonecode, mobile, password) => async dispatch => {
  try {
    dispatch({ type: LOAD_LOGIN, payload: [] });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    const res = await axios.post(
      "https://app.telefreik.com/api/v1/mobile/customer/login",
      {
        phonecode: phonecode,
        mobile: mobile,
        password: password
      },
      config
    );
    if (res.status === 200) {
      window.localStorage.setItem("UserData", res.data.data);
      dispatch({ type: SUCCESS_LOGIN, payload: res.data });
    } else {
      dispatch({
        type: FALID_LOGIN,
        payload: res.errors
      });
    }
  } catch (error) {
    dispatch({
      type: FALID_LOGIN,
      payload: error.response.data.errors
    });
  }
};

export const RegisterAction = (email, phoneNumber, name, password, confirmPassword ) => async dispatch => {
  console.log( {
    "email": email,
    "mobile": phoneNumber,
    "phonecode": "20",
    "name": name,
    "firebase_token": `0${phoneNumber}`,
    "os_system": "android",
    "os_version": "v1",
    "password" : password ,
    "password_confirmation" : confirmPassword 
  })  
  try {
    dispatch({ type: LOAD_REGISTER, payload: {} });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    const res = await axios.post(
      `https://app.telefreik.com/api/v1/mobile/customer/register`,
      
      {
        email: email,
        mobile: phoneNumber,
        phonecode: 20,
        name: name,
        firebase_token: `0${phoneNumber}`,
        os_system: "android",
        os_version: "v1",
        password : password ,
        password_confirmation : confirmPassword 
      },
      config

    );
    console.log(res)
    if(res.status === 200 ) {
      dispatch({type : SUCCESS_REGISTER , payload : res.data })
    }
  } catch (error) {
    console.log(error)

    dispatch({type : FAIL_REGISTER , payload : error.response.data.message})
  }
};

export const sendOTPAction = (phoneNumber, phoneCode) => async dispatch => {
  try {
    dispatch({ type: LOAD_SEND_OTP, payload: [] });
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ phoneNumber, phoneCode });
    const res = await axios.post(
      "https://app.telefreik.com/api/v1/mobile/customer/send-otp",
      body,
      config
    );
    dispatch({ type: SUCCESS_SEND_OTP, payload: res.data });
  } catch (error) {
    dispatch({ type: FAIL_SEND_OTP, payload: error.response.data.message });
  }
};

export const verifyOTPAction = (mobile, phonecode, code) => async dispatch => {
  try {
    dispatch({ type: LOAD_VERIFI_OTP, payload: [] });
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ mobile, phonecode, code });
    const res = await axios.post(
      "https://app.telefreik.com/api/v1/mobile/customer/verify-otp",
      body,
      config
    );
    if (res.status === 200) {
      window.localStorage.setItem("UserData", res.data.data);
    }
    dispatch({ type: SUCCESS_VERIFI_OTP, payload: res.data });
  } catch (error) {
    dispatch({ type: FAIL_VERIFI_OTP, payload: error.response.data.message });
  }
};

export const validateOTPAction = (
  phoneNumber,
  phoneCode,
  otpCode
) => async dispatch => {
  try {
    dispatch({ type: LOAD_VALIDATE_OTP, payload: [] });
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ phoneNumber, phoneCode, otpCode });
    const res = await axios.post(
      "https://app.telefreik.com/api/v1/mobile/customer/validate-otp",
      body,
      config
    );
    dispatch({ type: SUCCESS_VALIDATE_OTP, payload: res.data });
  } catch (error) {
    dispatch({ type: FAIL_VALIDATE_OTP, payload: error.message });
  }
};
export const resendOTPAction = (mobile, phonecode) => async dispatch => {
  try {
    dispatch({ type: LOAD_RESEND_OTP, payload: [] });
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ mobile, phonecode });
    const res = await axios.post(
      "https://app.telefreik.com/api/v1/mobile/customer/resend-otp",
      body,
      config
    );
    dispatch({ type: SUCCESS_RESEND_OTP, payload: res.data });
  } catch (error) {
    dispatch({ type: FAIL_RESEND_OTP, payload: error.message });
  }
};
/**
 * @doc logout 
 * @access private 
 * @method just middleware 
 */
export const logoutAction = () => async dispatch => {
  dispatch({ type: LOGOUT, paylod: [] });
};

/**
 * @doc delete profile 
 * @access private 
 * @method DELETE 
 */
export const DeleteAccAction = (token) => async dispatch => {
 try {
    dispatch({type : LOAD_DELETE_ACC , payload : null })

    const config = {
      headers: {
        "Content-Type": "multipart/form-data" ,
        "Authorization" : `Bearer ${token}`
      }
    };

    const res = await axios.delete("https://app.telefreik.com/api/transports/profile" , config )
    dispatch({type : SUCCESS_DELETE_ACC , payload : res.data })
    dispatch({ type: LOGOUT, paylod: [] });
    
 } catch (error) {
    dispatch({type : FAIL_DELETE_ACC , payload : error.response.data.message  })
 }
}

export const setTripType = tripType => ({
  type: SET_TRIP_TYPE,
  payload: tripType
});

/**
 * @doc update profile 
 * @access private 
 * @method PUT 
 */
export const updateProfileAction = (token ,  formData ) => async dispatch => {
  try {
    dispatch({type : LOAD_UPDATE_ACC , payload : null })
    const config = {
        headers: {
          "Content-Type": "application/json" ,
          "Authorization" : `Bearer ${token}`
        }
      } 
   const res = await axios.post(`https://app.telefreik.com/api/transports/profile` , 
   formData
   , config)  
   if(res.status === 200){
    await dispatch({type: SUCCESS_UPDATE_ACC , payload : res.data.message })
   } 
} catch (error) {
    dispatch({type : FAIL_UPDATE_ACC , payload : error.response.data.message })
}
}