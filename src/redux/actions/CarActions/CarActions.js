import axios from "axios";
import { LOAD_SEARCH_CAR, SUCCESS_SEARCH_CAR, FAIL_SEARCH_CAR } from "../types";

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
    if(res.status === 200 ){
      dispatch({type : SUCCESS_SEARCH_CAR , payload : res.data.data })
    }
  } catch (error) {
    dispatch({type : FAIL_SEARCH_CAR , payload : error.response.data.message})
  }
};
