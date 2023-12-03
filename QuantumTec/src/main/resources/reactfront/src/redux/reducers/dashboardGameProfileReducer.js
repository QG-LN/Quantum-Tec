import { SET_DASHBOARD_GAME_PROFILE_LIST } from '../actions/dashboardGameProfileAction';

const initialState = {
  dashboardGameList: []
};

function dashboardGameProfileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DASHBOARD_GAME_PROFILE_LIST:
      return {
        ...state,
        dashboardGameList: action.payload
      };
    default:
      return state;
  }
}

export default dashboardGameProfileReducer;