// actions/dashboardUserProfileAction.js

export const SET_DASHBOARD_USER_PROFILE_LIST = 'SET_DASHBOARD_USER_PROFILE_LIST';

export function setDashboardUserProfileList(userList) {
  return {
    type: SET_DASHBOARD_USER_PROFILE_LIST,
    payload: userList
  };
}