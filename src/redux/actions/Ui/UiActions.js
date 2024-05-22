 import axios from 'axios'
 const NEXT_STEP = 'NEXT_STEP';
 const PREV_STEP = 'PREV_STEP';
const REST_STEP = "REST_STEP";

 const LOAD_PARTNER = 'LOAD_PARTNER'
 const SUCCESS_PARTNER = 'SUCCESS_PARTNER'
 const FAIL_PARTNER = 'FAIL_PARTNER'

//  actions for stepper 
 export const nextStep = (tripType) => ({
    type: NEXT_STEP,
    tripType
  });
  
  export const prevStep = (tripType) => ({
    type: PREV_STEP,
    tripType
  });
  
  export const restStep = (tripType) => ({
    type : REST_STEP ,
    tripType
  })

  // actions for our parent 

  export const OurParentAction = () => async dispatch => {
    try {
      dispatch({type : LOAD_PARTNER , payload : null })
      const config = {
        headers: {
          "Content-Type": "multipart/form-data" ,
        }
      }
      const res = await axios.get("https://app.telefreik.com/api/v1/partners")
      if(res.status === 200 ) {
        dispatch({type : SUCCESS_PARTNER , payload : res.data.data} )
      }
    } catch (error) {
      dispatch({type : FAIL_PARTNER , payload : error.data.massage })
    }
  }
