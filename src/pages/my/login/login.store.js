import { combineReducers } from 'redux';
import Alert from 'react-s-alert';
import fetch from '../../../utils/fetch';
import { USERINFO_FULFILLED } from '../../../stores/common';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';


export const loginAction = (username, pwd) => (dispatch) => {
  dispatch({ type: LOGIN_PENDING });

  fetch('/login', {
    data: {
      username,
      pwd,
    },
  }).then((json) => {
    dispatch({ type: LOGIN_FULFILLED, payload: json.data });

    // 获取到用户信息后单独处理（存储 token/用户信息）
    dispatch({ type: USERINFO_FULFILLED, payload: json });
  }).catch((e) => {
    console.log(e);
    dispatch({ type: LOGIN_REJECTED });
  });
};

const loginReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
export const FORGET_PENDING = 'FORGET_PENDING';
export const FORGET_FULFILLED = 'FORGET_FULFILLED';
export const FORGET_REJECTED = 'FORGET_REJECTED';
export const forgetAction = (phone, pwd) => (dispatch) => {
  dispatch({ type: FORGET_PENDING });

  fetch('/reset/pwd', {
    data: {
      phone,
      pwd,
    },
  }).then((json) => {
    dispatch({ type: FORGET_FULFILLED, payload: json.data });
  }).catch((e) => {
    console.log(e);
    dispatch({ type: FORGET_REJECTED });
  });
};

const forgetReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case FORGET_PENDING:
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case FORGET_FULFILLED:
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case FORGET_REJECTED:
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

// TODO:
export const AGAINCODE_PENDING = 'AGAINCODE_PENDING';
export const AGAINCODE_FULFILLED = 'AGAINCODE_FULFILLED';
export const AGAINCODE_REJECTED = 'AGAINCODE_REJECTED';

export const againVerifyCode = phone => (dispatch) => {
  dispatch({ type: AGAINCODE_PENDING });
  fetch('/verifycode', {
    data: { phone },
  }).then((json) => {
    Alert.success('发送成功');
    dispatch({ type: AGAINCODE_FULFILLED, payload: json.data });
  }).catch(() => {
    dispatch({ type: AGAINCODE_REJECTED });
  });
};
const againReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case AGAINCODE_PENDING:
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case AGAINCODE_FULFILLED:
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case AGAINCODE_REJECTED:
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
  forgetReducer,
  againReducer,
  loginReducer,

});
export default reducer;

