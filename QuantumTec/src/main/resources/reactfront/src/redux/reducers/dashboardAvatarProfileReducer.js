import { SET_DASHBOARD_AVATAR_PROFILE_LIST } from '../actions/dashboardAvatarProfileAction';

const initialState = {
  dashboardAvatarList: []
};

function dashboardAvatarProfileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DASHBOARD_AVATAR_PROFILE_LIST:
      return {
        ...state,
        dashboardAvatarList: action.payload
      };
    default:
      return state;
  }
}

export default dashboardAvatarProfileReducer;