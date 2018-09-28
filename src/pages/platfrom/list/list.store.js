import fetch from '../../../utils/fetch';

export const requestTeamList = data => ({
  type: 'PLATFORM_LIST',
  meta: {
    more: data.more,
  },
  payload: fetch('/team', { method: 'GET', data, loading: !data.more }),
});

export default (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  let data;
  const { more } = action.meta || {};
  const { data: payloadData } = action.payload || {};

  switch (action.type) {
    case 'PLATFORM_LIST_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'PLATFORM_LIST_FULFILLED':
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
      };
    case 'PLATFORM_LIST_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

