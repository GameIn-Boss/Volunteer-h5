import { combineReducers } from 'redux';
import fetch from '../../utils/fetch';

export const requestHomeData = () => ({
  type: 'HOME_DATA',
  payload: fetch('/index', { method: 'GET' }),
});
const homeReducer = (state = {
  fetching: false,
  failed: false,
  city: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'HOME_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'HOME_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'HOME_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

export const requestWebIndex = () => ({
  type: 'WEB_INDEX',
  payload: fetch('/web/index', { method: 'GET' }),
});
const webIndexReducer = (state = {
  fetching: false,
  failed: false,
  city: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'WEB_INDEX_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'WEB_INDEX_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'WEB_INDEX_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  home: homeReducer,
  webIndex: webIndexReducer,
});
export default reducer;
