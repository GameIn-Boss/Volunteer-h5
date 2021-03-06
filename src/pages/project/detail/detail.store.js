import queryString from 'query-string';
import fetch from '../../../utils/fetch';
/**
 * 切换 TAB 记录 TAB 状态，在后退操作后需要记录
 */

export const saveProjectTabIndex = (tabIndex,lastProjectId) => ({
  type: 'SWITCH_PROJECT_TAB',
  payload: { tabIndex , lastProjectId },
});

/**
 * 项目详情 Action
 * @param {string} projectId
 */
export const requestProjectDetail = (projectId) => {
  const params = queryString.parse(location.search);
  const preview = params.preview;
  const data = {};

  if (preview === '1') {
    data.preview = 1;
  }

  return {
    type: 'PROJECT_DETAIL',
    meta: {
      id: projectId,
    },
    payload: fetch(`/project/${projectId}`, { method: 'GET', data }),
  };
};


/**
 * 项目收藏 Action
 */
export const collectProject = projectId => ({
  type: 'PROJECT_COLLECT',
  payload: fetch('/user/collection', {
    data: {
      id: projectId,
      type: 0, // 0-项目, 1-团队
    },
    successWords: '收藏成功',
  }),
});

export const unCollectProject = projectId => ({
  type: 'PROJECT_UNCOLLECT',
  payload: fetch('/user/uncollection', {
    data: {
      id: projectId,
      type: 0, // 0-项目, 1-团队
    },
    successWords: '取消收藏成功',
  }),
});

/**
 * 项目加入/退出 Action
 */
export const joinProject = projectId => ({
  type: 'PROJECT_JOIN',
  payload: fetch(`/project/join/${projectId}`, {
    data: {
      id: projectId,
      type: 1, // 0-退出, 1-加入
    },
    successWords: '已成功申请，请耐心等待审核',
  }),
});

export const quitProject = projectId => ({
  type: 'PROJECT_QUIT',
  payload: fetch(`/project/join/${projectId}`, {
    data: {
      id: projectId,
      type: 0, // 0-退出, 1-加入
    },
    successWords: '退出成功',
  }),
});


export default (state = {
  fetching: false,
  failed: false,
  fetchingId: null,
  tabIndex: 0,
  lastProjectId:0,
  data: null,
}, action) => {
  switch (action.type) {
    case 'PROJECT_DETAIL_PENDING':
      return {
        ...state,
        fetching: true,
        fetchingId: action.meta.id,
        failed: false,
      };
    case 'PROJECT_DETAIL_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetchingId: action.meta.id,
        failed: false,
        data: action.payload && action.payload.data,
      };
    case 'PROJECT_DETAIL_REJECTED':
      return {
        ...state,
        failed: true,
        fetchingId: action.meta.id,
        fetching: false,
      };
    case 'PROJECT_COLLECT_FULFILLED':
      return {
        ...state,
        data: {
          ...state.data,
          collection_status: 1,
        },
      };
    case 'PROJECT_UNCOLLECT_FULFILLED':
      return {
        ...state,
        data: {
          ...state.data,
          collection_status: 0,
        },
      };
    case 'PROJECT_JOIN_FULFILLED':
      console.log(action);
      return {
        ...state,
        data: {
          ...state.data,
          // 0审核中 1通过 2驳回
          join_status: 0,
        },
      };
    case 'PROJECT_QUIT_FULFILLED':
      return {
        ...state,
        data: {
          ...state.data,
          // 0审核中 1通过 2驳回
          join_status: -1,
        },
      };
    case 'SWITCH_PROJECT_TAB':
      return {
        ...state,
        tabIndex: action.payload.tabIndex,
        lastProjectId: action.payload.lastProjectId,
      };
    default:
      return state;
  }
};

