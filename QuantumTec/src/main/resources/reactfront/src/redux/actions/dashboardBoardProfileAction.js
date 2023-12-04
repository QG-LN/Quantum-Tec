export const SET_DASHBOARD_BOARD_PROFILE_LIST = 'SET_DASHBOARD_BOARD_PROFILE_LIST';

export function setDashboardBoardProfileList(boardList) {
  return {
    type: SET_DASHBOARD_BOARD_PROFILE_LIST,
    payload: boardList
  };
}