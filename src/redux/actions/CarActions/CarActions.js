import axios from "axios";
import {
  LOAD_SEARCH_CAR,
  SUCCESS_SEARCH_CAR,
  FAIL_SEARCH_CAR,
  LOAD_SINGLE_CAR,
  SUCCESS_SINGLE_CAR,
  FAIL_SINGLE_CAR,
  LOAD_CREATE_TICKET_CAR,
  SUCCESS_CREATE_TICKET_CAR,
  FAIL_CREATE_TICKET_CAR,
  LOAD_CAR_LOCATION ,
  GET_CAR_LOCATION,
  FAILD_CAR_LOCATION
} from "../types";


export const getLocationCar = () => async dispatch => {
  try {
    dispatch({ type: LOAD_CAR_LOCATION });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    };

    const res = await axios.get(
        'https://app.telefreik.com/api/transports/locations/private',
      config
    );
    if(res.status === 200 ) {
      dispatch({
        type: GET_CAR_LOCATION , payload : res.data.data
      });
    }

  } catch (error) {
    dispatch({
      type: FAILD_CAR_LOCATION,
      payload: error.response.data.message 
     });
  }
};

/**
 * @doc search car trip 
 * @access public 
 * @method GET 
 */
export const SearchCarAction = (
  fromLocationId,
  toLocationId,
  startDate
) => async dispatch => {
  try {
    dispatch({ type: LOAD_SEARCH_CAR, payload: null });
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.get(
      `https://app.telefreik.com/api/transports/private/trips?from_location_id=${fromLocationId}&to_location_id=${toLocationId}&date=${startDate}&filters=1`,
      config
    );
    if (res.status === 200) {
      dispatch({ type: SUCCESS_SEARCH_CAR, payload: res.data.data });
    }
  } catch (error) {
    dispatch({ type: FAIL_SEARCH_CAR, payload: error.response.data.message });
  }
};

/**
 * @doc single car trip 
 * @access private 
 * @method GET 
 */
export const singleCarAction = (item) => async dispatch => {
  try {
    dispatch({type : LOAD_SINGLE_CAR , payload : null })
    if(item){
      await dispatch({type : SUCCESS_SINGLE_CAR , payload : item })
    }
  } catch (error) {
    dispatch({type : FAIL_SINGLE_CAR , payload : "this trip not found "})
  }
}

/**
 * @doc create ticket car 
 * @access private 
 * @method POST 
 */
 export const createTicketCarAction = (data , id , token ) => async dispatch => {
  try {
    dispatch({type : LOAD_CREATE_TICKET_CAR , payload : [] })
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    } 
    const res = await axios.post(`https://app.telefreik.com/api/v2/transports/private/trips/${id}/create-ticket` , data , config)
    if(res.status === 200 ){
       dispatch({type : SUCCESS_CREATE_TICKET_CAR , payload : res.data.data })
    }
  } catch (error) {
    dispatch({type : FAIL_CREATE_TICKET_CAR , payload : error.response.data.message })
  }
 }

