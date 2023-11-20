// reducers/avatarReducer.js

import { SET_DASHBOARD_USER_PROFILE_LIST } from '../actions/dashboardUserProfileAction';

const initialState = {
  dashboardUserList: []
};

function dashboardUserProfileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DASHBOARD_USER_PROFILE_LIST:
      return {
        ...state,
        dashboardUserList: action.payload
      };
    default:
      return state;
  }
}

export default dashboardUserProfileReducer;
