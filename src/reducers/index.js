import {combineReducers} from 'redux';
import FetchData from './fetchDataReducer';

export default combineReducers({
  data:FetchData,
});