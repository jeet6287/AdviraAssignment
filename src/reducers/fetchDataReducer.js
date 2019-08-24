import {FETCH_DATA , RESET_DATA, FAILED} from '../actions/types';

const INIT_STATE = { data:[], error:'',loading:true };

export default (state = INIT_STATE , action) => {
    switch(action.type){
        case FETCH_DATA:
            let oldDataList = state.data;
            let currentDataList = action.payload;
            let newDataList = oldDataList.concat(currentDataList); 
            return {...state,data:newDataList,loading:false} 
        case RESET_DATA:
            return {...state , data:[],loading:true}
        case FAILED:
            return{...state , error:action.payload};     
        default:
            return state;    
    }
}