import produce from "immer";
import {
  LOAD_PROFILE_TICKET,
  SUCCESS_PROFILE_TICKET,
  FAIL_PROFILE_TICKET
} from "../../actions/types";


/**
 * ticket reducer 
 */

export const TicketReducer = (
    state = {
        loading : false ,
        tickets : [] ,
        error : null 
    } , action 
) => {

    return produce(state , draft => {
        switch (action.type) {
            case LOAD_PROFILE_TICKET:
                draft.loading = true;
                draft.error = null;
                break;
            case SUCCESS_PROFILE_TICKET : 
                draft.loading = false;
                draft.tickets = action.payload;
                draft.error = null;    
            break ;

            case FAIL_PROFILE_TICKET : 
                 draft.loading = false ;
                 draft.error = action.payload 
                 break ;

            default:
                break;
        }
    })
}