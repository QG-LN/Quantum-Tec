// store.js

import { createStore, combineReducers } from 'redux';
import avatarReducer from './reducers/avatarReducer';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

const rootReducer = combineReducers({
  avatar: avatarReducer
});

const store = createStore(rootReducer,composeWithDevTools());

export default store;
