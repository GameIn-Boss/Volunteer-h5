import { combineReducers } from 'redux';
import fetch from '../../utils/fetch';

export const requestNewsList = data => ({
  type: 'NEWS_LIST',
  payload: fetch('/news/list', { method: 'GET', data }),
});
const newsListReducer = (state = {
  fetching: false,
  failed: false,
  city: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'NEWS_LIST_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'NEWS_LIST_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'NEWS_LIST_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

export const requestNews = id => ({
  type: 'NEWS_DATA',
  payload: fetch(`/news/${id}`, { method: 'GET' }),
});
const newsReducer = (state = {
  fetching: false,
  failed: false,
  city: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'NEWS_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'NEWS_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'NEWS_DATA_REJECTED':
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
  news: newsReducer,
  newsList: newsListReducer,
});
export default reducer;
