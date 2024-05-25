import produce from "immer";
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
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_SEARCH_CAR:
        draft.loadingSearchCar = true;
        draft.errorSearchCar = null;
        draft.dataSearchCar = [];
        break;
      case SUCCESS_SEARCH_CAR:
        draft.loadingSearchCar = false;
        draft.dataSearchCar = action.payload;
        draft.errorSearchCar = null;
        break;
      case FAIL_SEARCH_CAR:
        draft.loadingSearchCar = false;
        draft.errorSearchCar = action.payload;
        break;
      default:
        break;
    }
  });
};
