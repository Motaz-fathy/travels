import axios from "axios"; 
import {
    LOAD_PROFILE_TICKET ,
    SUCCESS_PROFILE_TICKET,
    FAIL_PROFILE_TICKET ,
    LOAD_CREATE_ADDRESS,
    SUCCESS_CREATE_ADDRESS,
    FAIL_CREATE_ADDRESS,
    LOAD_GET_ADDRESS,
    SUCCESS_GET_ADDRESS,
    FAIL_GET_ADDRESS,
    LOAD_DELETE_ADDRESS,
    SUCCESS_DELETE_ADDRESS,
    FAIL_DELETE_ADDRESS,
    LOAD_UPDATE_ADDRESS,
    SUCCESS_UPDATE_ADDRESS,
    FAIL_UPDATE_ADDRESS
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

/**
 * create address  
 * @access private 
 * @method POST 
 */
export const createAddressAction = (addressData , token ) => async dispatch => {
    try {
        dispatch({type : LOAD_CREATE_ADDRESS , payload : null })
        const config = {
            headers: {
              "Content-Type": "application/json" ,
              "Authorization" : `Bearer ${token}`
            }
          } 
         const res = await axios.post('https://app.telefreik.com/api/transports/profile/address-book' , addressData , config )

         if(res.status === 200 ) {
            dispatch({type : SUCCESS_CREATE_ADDRESS , payload : res.data.data })
         }

    } catch (error) {
        dispatch({type : FAIL_CREATE_ADDRESS , payload : error.response.data.message })
    }
}

/**
 * get address  
 * @access private 
 * @method GET 
 */
export const getAddressAction = (token) => async dispatch => {
    try {
        dispatch({type : LOAD_GET_ADDRESS , payload : [] })
        const config = {
            headers: {
              "Content-Type": "multipart/form-data" ,
              "Authorization" : `Bearer ${token}`
            }
          } 
       const res = await axios.get('https://app.telefreik.com/api/transports/profile/address-book' , config)  
       if(res.status === 200){
         dispatch({type: SUCCESS_GET_ADDRESS , payload : res.data.data })
       } 
    } catch (error) {
        dispatch({type : FAIL_GET_ADDRESS , payload : error.response.data.message })
    }
}

/**
 * delete address  
 * @access private 
 * @method DELETE 
 */
export const deleteAddressAction = (token , id) => async dispatch => {
    try {
        dispatch({type : LOAD_DELETE_ADDRESS , payload : null })
        const config = {
            headers: {
              "Content-Type": "multipart/form-data" ,
              "Authorization" : `Bearer ${token}`
            }
          } 
       const res = await axios.delete(`https://app.telefreik.com/api/transports/profile/address-book/${id}` , config)  
       if(res.status === 200){
        await dispatch({type: SUCCESS_DELETE_ADDRESS , payload : res.data.message })
       } 
    } catch (error) {
        dispatch({type : FAIL_DELETE_ADDRESS , payload : error.response.data.message })
    }
}

/**
 * edit address  
 * @access private 
 * @method UPDATE 
 */
export const updateAddressAction = (token , id , updateData) => async dispatch => {
    try {
        dispatch({type : LOAD_UPDATE_ADDRESS , payload : null })
        const config = {
            headers: {
              "Content-Type": "application/json" ,
              "Authorization" : `Bearer ${token}`
            }
          } 
       const res = await axios.put(`https://app.telefreik.com/api/transports/profile/address-book/${id}` , updateData , config)  
       if(res.status === 200){
        await dispatch({type: SUCCESS_UPDATE_ADDRESS , payload : res.data.message })
       } 
    } catch (error) {
        dispatch({type : FAIL_UPDATE_ADDRESS , payload : error.response.data.message })
    }
}