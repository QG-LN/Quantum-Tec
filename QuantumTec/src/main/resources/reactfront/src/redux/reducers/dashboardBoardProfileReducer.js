import { SET_DASHBOARD_BOARD_PROFILE_LIST } from '../actions/dashboardBoardProfileAction';

const initialState = {
  dashboardBoardList: []
};

function dashboardBoardProfileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DASHBOARD_BOARD_PROFILE_LIST:
      return {
        ...state,
        dashboardBoardList: action.payload
      };
    default:
      return state;
  }
}

export default dashboardBoardProfileReducer;