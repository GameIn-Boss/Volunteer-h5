
import { combineReducers } from 'redux';
import fetch from '../../../utils/fetch';
import { API_HOST } from '../../../utils/config';


export const REGISTER_PENDING = 'REGISTER_PENDING';
export const REGISTER_FULFILLED = 'REGISTER_FULFILLED';
export const REGISTER_REJECTED = 'REGISTER_REJECTED';


export const register = data => (dispatch) => {
  dispatch({ type: REGISTER_PENDING });

  fetch('/register', {
    data,
  }).then((json) => {
    dispatch({ type: REGISTER_FULFILLED, payload: json.data });
  }).catch((e) => {
    console.log(e);
    dispatch({ type: REGISTER_REJECTED });
  });
};

// 注册
const registerReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case REGISTER_PENDING:
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case REGISTER_FULFILLED:
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case REGISTER_REJECTED:
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
// 获取验证码
export const requestVerifyCode = data => ({
  type: 'CODE',
  payload: fetch(`${API_HOST}/api/verifycode`, {
    data,
    successWords: '发送成功',
  }),
});


const codeReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'CODE_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'CODE_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload,
      };
    case 'CODE_REJECTED':
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
  code: codeReducer,
  register: registerReducer,

});
export default reducer;
