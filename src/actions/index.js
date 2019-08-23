import {FETCH_DATA , RESET_DATA ,FAILED} from './types';

const URL = 'https://looksyummyapp.com/api/meal/feed?user_id=3';

export const fetchData = (user_id,pageIndex) => {
    return (dispatch) => {
      fetch(URL,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: "page=pageIndex" 
      })
     .then(responce => responce.json())
     .then((lists) => {
         return dispatch({type:FETCH_DATA,payload:lists.meals.data}); 
     })
     .catch((e) => {
        return dispatch({type:FAILED , payload:e}); 
     });
    };
}

export const resetData = () => {
   return {type:RESET_DATA , payload : {}}; 
}

