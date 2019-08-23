import {FETCH_DATA , RESET_DATA, FAILED} from '../actions/types';

const INIT_STATE = { data:[], error:'',loading:true };

export default (state = INIT_STATE , action) => {
    switch(action.type){
        case FETCH_DATA:
            return {...state,data:action.payload,loading:false}
        case RESET_DATA:
            return {...state , data:[],loading:true}
        case FAILED:
            return{...state , error:action.payload};     
        default:
            return state;    
    }
}