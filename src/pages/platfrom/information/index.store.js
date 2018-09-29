import fetch from '../../../utils/fetch';

export const requestSearch = data => ({
  type: 'PLATFORM_INFORMATIONSEARCH',
  meta: {
    id_number: data.id_number,
  },
  payload: fetch('/platform/volunteer', { method: 'GET', data}),
});

export default (state = {
  fetching: false,
  failed: false,
  keyword: null,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PLATFORM_INFORMATIONSEARCH_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
        keyword:action.meta.id_number,
      };
    case 'PLATFORM_INFORMATIONSEARCH_FULFILLED':
    
      return {
        ...state,
        fetching: false,
        failed: false,
        data:action.payload && action.payload.data,
        keyword:action.meta.id_number,
      };
    case 'PLATFORM_INFORMATIONSEARCH_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
        keyword:action.meta.id_number,
      };
    default:
      return state;
  }
};

