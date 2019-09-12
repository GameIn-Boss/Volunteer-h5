import { combineReducers } from 'redux';
import fetch from '../../utils/fetch';

export const requestTeamList = data => ({
  type: 'TEAM_LIST',
  payload: fetch('/team', { method: 'GET', data: { ...data } }),
});
const teamListReducer = (state = {
  fetching: false,
  failed: false,
  city: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'TEAM_LIST_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'TEAM_LIST_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'TEAM_LIST_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

export const requestTeamDetail = id => ({
  type: 'TEAM_DATA',
  payload: fetch(`/team/${id}`, { method: 'GET' }),
});
const teamReducer = (state = {
  fetching: false,
  failed: false,
  city: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'TEAM_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'TEAM_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'TEAM_DATA_REJECTED':
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
  teamList: teamListReducer,
  teamData: teamReducer,
});
export default reducer;
