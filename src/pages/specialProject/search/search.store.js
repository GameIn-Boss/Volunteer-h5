import fetch from '../../../utils/fetch';

export const requestSearch = data => ({
  type: 'PROJECCT_SEARCH',
  meta: {
    more: data.more,
    keyword: data.name,
  },
  payload: fetch('/special_project', { method: 'GET', data, loading: !data.more }),
});

export default (state = {
  fetching: false,
  failed: false,
  keyword: null,
  data: null,
}, action) => {
  let data;
  const { more } = action.meta || {};
  const { data: payloadData } = action.payload || {};

  switch (action.type) {
    case 'PROJECCT_SEARCH_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'PROJECCT_SEARCH_FULFILLED':
      if (!more || !state.data) {
        data = payloadData;
      } else {
        data = {
          list: state.data.list.concat(payloadData.list),
          page: payloadData.page,
        };
      }

      return {
        ...state,
        fetching: false,
        failed: false,
        data,
        keyword: action.meta.keyword,
      };
    case 'PROJECCT_SEARCH_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
        keyword: action.meta.keyword,
      };
    default:
      return state;
  }
};

