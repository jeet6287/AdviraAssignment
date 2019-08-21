import {FETCH_DATA , RESET_DATA } from './types';

export const fetchData = () => {
    return {type:FETCH_DATA , payload: {"name" : "Jitendra"}};
}

export const resetData = () => {
  return {type:RESET_DATA , payload : {}};
}