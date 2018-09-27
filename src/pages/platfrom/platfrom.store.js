import { combineReducers } from 'redux';

import teamDetailReducer from './detail/detail.store';
import teamListReducer from './list/list.store';
import teamSearchReducer from './search/search.store';
import team1SearchReducer from './information/index.store';

export default combineReducers({
  detail: teamDetailReducer,
  list: teamListReducer,
  search: teamSearchReducer,
  team1:team1SearchReducer,
});
