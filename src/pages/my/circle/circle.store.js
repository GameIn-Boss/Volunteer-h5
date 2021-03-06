
import { combineReducers } from 'redux';
import fetch from '../../../utils/fetch';
import { API_HOST } from '../../../utils/config';
// 我的话题评论消息接口
export const newCommentAction = data => ({
  type: 'NEWCOMMENT_DATA',
  meta: {
    more: data.more,
  },
  payload: fetch(`/comment/new`, { method: 'GET', data, loading: !data.more }),
});
const newCommentReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  let data;
  const { more } = action.meta || {};
  const { data: payloadData } = action.payload || {};
  switch (action.type) {
    case 'NEWCOMMENT_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'NEWCOMMENT_DATA_FULFILLED':
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
    case 'NEWCOMMENT_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

// 我的话题列表接口
// current_page: 页码【非必填】默认1
// •page_size: 页长【非必填】 默认10

export const myFeelingAction = data => ({
  type: 'MYFEElING_DATA',
  meta: {
    more: data.more,
  },
  payload: fetch('/feeling/my', { method: 'GET', data, loading: !data.more }),
});
const myFeelingReducer = (state = {
  fetching: false,
  failed: false,
  data: null,

}, action) => {
  let data;
  const { more } = action.meta || {};
  const { data: payloadData } = action.payload || {};
  switch (action.type) {
    case 'MYFEElING_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'MYFEElING_DATA_FULFILLED':
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
    case 'MYFEElING_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

// 分页话题列表接口
export const moreFeelingAction = data => ({
  type: 'MORE_FEElING_DATA',
  meta: {
    type: data.type === 1 ? 'all' : null,
    more: data.more,
  },
  payload: fetch('/feeling', { method: 'GET', data, loading: !data.more }),
});
const moreFeelingReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
  type: null,
}, action) => {
  let data;
  const { more } = action.meta || {};
  const { data: payloadData } = action.payload || {};
  switch (action.type) {
    case 'MORE_FEElING_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'MORE_FEElING_DATA_FULFILLED':
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
        type: action.meta.type,
        data,
      };
    case 'MORE_FEElING_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 话题详情
export const feelingDetailAction = id => ({
  type: 'FEElING_DETAIL_DATA',
  payload: fetch(`/feeling/${id}`, { method: 'GET' }),
});
const feelingDetailReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
  type: null,
}, action) => {
  switch (action.type) {
    case 'FEElING_DETAIL_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'FEElING_DETAIL_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'FEElING_DETAIL_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 话题列表接口
// type: 类型 【非必填】 不填表示全部， 1无标签 2项目 3团队
// •relation_id: 关联id【非必填】当type=2|3必填，分别表示项目id或团队id
// •current_page: 页码【非必填】默认1
// •page_size: 页长【非必填】 默认10
export const feelingAction = data => ({
  type: 'FEElING_DATA',
  meta: {
    type: data.type === 1 ? 'all' : data.type === 2 ? 'project' : 'team',
  },
  payload: fetch(`/feeling?type=${data.type}&&relation_id=${data.relation_id}&&&page_size=${data.page_size}`, { method: 'GET' }),
});
const feelingReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
  type: null,
}, action) => {
  switch (action.type) {
    case 'FEElING_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'FEElING_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
        type: action.meta.type,
      };
    case 'FEElING_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// // 发布话题接口
// type: 类型 【必填】 不填表示全部， 1无标签 2项目 3团队
// •relation_id: 关联id【非必填】当type=2|3必填，分别表示项目id或团队id
// •content: 内容【必填】
// •photo: 图片【非必填】


export const upFeelingAction = data => ({
  type: 'UPFEELING_DATA',
  meta: {
    type: data.type === 1 ? 'all' : data.type === 2 ? 'project' : 'team',
  },
  payload: fetch('/feeling', { data }, { method: 'POST' }),
});
const upFeelingReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
  type: null,
}, action) => {
  switch (action.type) {
    case 'UPFEELING_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'UPFEELING_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
        type: action.meta.type,
      };
    case 'UPFEELING_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

// 删除话题接口
export const deleteFeelingAction = id => ({
  type: 'DELETEFEELING_DATA',
  payload: fetch(`/feeling/${id}`, { method: 'DELETE' }),
});
const deleteFeelingReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'DELETEFEELING_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'DELETEFEELING_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'DELETEFEELING_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

// 点赞话题接口
export const observeAction = id => ({
  type: 'OBSERVE_DATA',
  payload: fetch(`/feeling/like/${id}`, { method: 'GET' }),
});
const observeReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'OBSERVE_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'OBSERVE_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'OBSERVE_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

// 取赞话题接口
export const unObserveAction = id => ({
  type: 'UNOBSERVE_DATA',
  payload: fetch(`/feeling/dislike/${id}`, { method: 'GET' }),
});
const unObserveReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'UNOBSERVE_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'UNOBSERVE_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'UNOBSERVE_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

// 发布话题评论接口
// id: 话题id 【必填】
// •comment: 内容【必填】
// •parent_id: 如是回复评论，传被评论的内容id【非必填】

export const postCommentAction = data => ({
  type: 'POSTCOMMENT_DATA',
  payload: fetch(`/feeling/comment/${data.id}`, { data }, { method: 'POST' }),
});
const postCommentReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'POSTCOMMENT_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'POSTCOMMENT_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'POSTCOMMENT_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
//  删除话题评论接口
export const deleteCommentAction = id => ({
  type: 'DELETECOMMENT_DATA',
  payload: fetch(`/comment/${id}`, { method: 'DELETE' }),
});
const deleteCommentReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'DELETECOMMENT_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'DELETECOMMENT_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'DELETECOMMENT_DATA_REJECTED':
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
  feeling: feelingReducer,
  upFeeling: upFeelingReducer,
  deleteFeeling: deleteFeelingReducer,
  myFeeling: myFeelingReducer,
  observe: observeReducer,
  unObserve: unObserveReducer,
  postComment: postCommentReducer,
  deleteComment: deleteCommentReducer,
  newComment: newCommentReducer,
  feelingDetail: feelingDetailReducer,
  moreFeeling: moreFeelingReducer,
});
export default reducer;
