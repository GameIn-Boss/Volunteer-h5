import { combineReducers } from 'redux';
import fetch from '../../utils/fetch';

export const requestProjectList = data => ({
  type: 'PROJECT_LIST',
  payload: fetch('/project', { method: 'GET', data: { ...data } }),
});
const projectListReducer = (state = {
  fetching: false,
  failed: false,
  city: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PROJECT_LIST_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'PROJECT_LIST_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'PROJECT_LIST_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

export const requestProjectDetail = id => ({
  type: 'PROJECT_DATA',
  payload: fetch(`/project/${id}`, { method: 'GET' }),
});
const projectReducer = (state = {
  fetching: false,
  failed: false,
  city: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PROJECT_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'PROJECT_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'PROJECT_DATA_REJECTED':
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
  projectList: projectListReducer,
  projectData: projectReducer,
});
export default reducer;
