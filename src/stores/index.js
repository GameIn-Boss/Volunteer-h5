/* global window:true */
import {
    pendingTasksReducer, // The redux reducer
} from 'react-redux-spinner';

import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';

import { userReducer } from './common';
import homeReducer from './../pages/home/home.store';
import newsReducer from './../pages/news/news.store';
import projectReducer from './../pages/project/project.store';
import patternReducer from './../pages/pattern/pattern.store';
import teamReducer from './../pages/team/team.store';

const rootReducer = combineReducers({
  user: userReducer,
  home: homeReducer,
  news: newsReducer,
  project: projectReducer,
  team: teamReducer,
  pattern: patternReducer,
  pendingTasks: pendingTasksReducer,
});

const middleware = [thunk, promiseMiddleware()];

/* eslint-disable no-underscore-dangle */
export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middleware)),
);
/* eslint-enable no-underscore-dangle */
