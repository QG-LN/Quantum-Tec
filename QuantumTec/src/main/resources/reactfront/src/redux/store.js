// store.js

import { createStore, combineReducers } from 'redux';
import avatarReducer from './reducers/avatarReducer';
import userReducer from './reducers/userReducer';
import dashboardUserProfileReducer from './reducers/dashboardUserProfileReducer';
import dashboardGameProfileReducer from './reducers/dashboardGameProfileReducer';
import dashboardAvatarProfileReducer from './reducers/dashboardAvatarProfileReducer';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

const rootReducer = combineReducers({
  avatar: avatarReducer,
  user: userReducer,
  dashboardUserProfile: dashboardUserProfileReducer,
  dashboardGameProfile: dashboardGameProfileReducer,
  dashboardAvatarProfile: dashboardAvatarProfileReducer,
});

const store = createStore(rootReducer,composeWithDevTools());

export default store;
