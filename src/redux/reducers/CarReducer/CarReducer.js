import {
  LOAD_SEARCH_CAR,
  SUCCESS_SEARCH_CAR,
  FAIL_SEARCH_CAR
} from "../../actions/types";

/**
 * @doc search car reducer 
 */
export const SearchCarReducer = (
  state = {
    loadingSearchCar: false,
    dataSearchCar: [],
    errorSearchCar: null
  },
  action
) => {
  switch (action.type) {

    case LOAD_SEARCH_CAR:
      return { loadingSearchCar: true, dataSearchCar: [] };
    case SUCCESS_SEARCH_CAR:
      return { loadingSearchCar: false, dataSearchCar: action.payload };
    case FAIL_SEARCH_CAR:
      return { loadingSearchCar: false, errorSearchCar: action.payload };

    default:
      return { ...state };
  }
};
