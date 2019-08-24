import {FETCH_DATA , RESET_DATA ,FAILED} from './types';

export const fetchData = (pageIndex) => {
    var URL = `https://looksyummyapp.com/api/meal/feed?user_id=3&page=${pageIndex}&results=20`;
    return (dispatch) => {
      fetch(URL,{
        method: 'POST',
      })
     .then(responce => responce.json())
     .then((lists) => {
         console.log("fetchData lists",lists); 
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

