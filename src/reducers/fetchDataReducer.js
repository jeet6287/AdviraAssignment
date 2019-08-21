import {FETCH_DATA , RESET_DATA, FAILED} from '../actions/types';

const INIT_STATE = { data:[], error:'' };

export default (state = INIT_STATE , action) => {
    switch(action.type){
        case FETCH_DATA:
            return {...state,data:action.payload}
        case RESET_DATA:
            return {...state , data:[]}
        case FAILED:
            return{...state , error:action.payload};     
        default:
            return state;    
    }
}