import {FETCH_DATA , RESET_DATA} from '../actions/types';

const INIT_STATE = { data:[], isLoading:false, error:'' };

export default (state = INIT_STATE , action) => {
    switch(action.type){
        case FETCH_DATA:
            return {...state,data:action.payload}
        case RESET_DATA:
            return {...state , data:[]}
            default:
            return state;    
    }
}