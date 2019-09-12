import { combineReducers } from 'redux';
import fetch from '../../utils/fetch';

export const requestPatternList = data => ({
  type: 'PATTERN_LIST',
  payload: fetch('/goodexample', { method: 'GET', data: { ...data } }),
});
const patternListReducer = (state = {
  fetching: false,
  failed: false,
  city: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PATTERN_LIST_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'PATTERN_LIST_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'PATTERN_LIST_REJECTED':
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
  patternList: patternListReducer,
});
export default reducer;
