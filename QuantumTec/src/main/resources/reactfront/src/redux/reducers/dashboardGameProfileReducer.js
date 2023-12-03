import { SET_DASHBOARD_GAME_PROFILE_LIST } from '../actions/dashboardGameProfileAction';

const initialState = {
  dashboardUserList: []
};

function dashboardGameProfileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DASHBOARD_GAME_PROFILE_LIST:
      return {
        ...state,
        dashboardUserList: action.payload
      };
    default:
      return state;
  }
}

export default dashboardGameProfileReducer;