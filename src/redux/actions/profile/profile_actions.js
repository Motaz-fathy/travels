import axios from "axios"; 
import {
    LOAD_PROFILE_TICKET ,
    SUCCESS_PROFILE_TICKET,
    FAIL_PROFILE_TICKET 
} from '../types'

export const GetProfileTicket = (token) => async dispatch => {
    try {
        dispatch({type : LOAD_PROFILE_TICKET , payload : [] })
        const config = {
            headers: {
              "Content-Type": "multipart/form-data" ,
              "Authorization" : `Bearer ${token}`
            }
          };

          const res = await axios.get("https://app.telefreik.com/api/v2/transports/profile/orders/buses" , config )
        if(res.status === 200 ){
            dispatch({type : SUCCESS_PROFILE_TICKET , payload : res.data.data})
        }
    } catch (error) {
        if(error.response && error.response.status === 400 ){
            dispatch({type : FAIL_PROFILE_TICKET , error : error.response.data.message })
        }
    }
}