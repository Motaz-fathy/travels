const NEXT_STEP = "NEXT_STEP";
const PREV_STEP = "PREV_STEP";
const REST_STEP = "REST_STEP";


const LOAD_PARTNER = "LOAD_PARTNER";
const SUCCESS_PARTNER = "SUCCESS_PARTNER";
const FAIL_PARTNER = "FAIL_PARTNER";

const initialState = {
  activeStep: 0
};

export const stepReducer = (state = initialState, action) => {
  const maxSteps = action.tripType === "round" ? 5 : 3;
  switch (action.type) {
    case NEXT_STEP:
      return {
        ...state,
        activeStep:
          state.activeStep < maxSteps - 1
            ? state.activeStep + 1
            : state.activeStep
      };
    case PREV_STEP:
      return {
        ...state,
        activeStep:
          state.activeStep > 0 ? state.activeStep - 1 : state.activeStep
      };
      case REST_STEP : 
      return {...state , activeStep : 0 }
    default:
      return state;
  }
};

export const OurPartnerReducer = (
  state = { loading: false, ourPartener: [], error: null },
  action
) => {
  switch (action.type) {
    case LOAD_PARTNER:
      return { loading: true, ourPartener: null, error: null };
    case SUCCESS_PARTNER:
      return { loading: false, ourPartener: action.payload };
    case FAIL_PARTNER:
      return { loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
