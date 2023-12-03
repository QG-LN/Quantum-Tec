export const SET_DASHBOARD_GAME_PROFILE_LIST = 'SET_DASHBOARD_GAME_PROFILE_LIST';

export function setDashboardGameProfileList(gameList) {
  return {
    type: SET_DASHBOARD_GAME_PROFILE_LIST,
    payload: gameList
  };
}