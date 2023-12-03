// actions/dashboardPaymentsProfileAction.js

export const SET_DASHBOARD_PAYMENTS_PROFILE_LIST = 'SET_DASHBOARD_PAYMENTS_PROFILE_LIST';

export function setDashboardPaymentsProfileList(userList) {
  return {
    type: SET_DASHBOARD_PAYMENTS_PROFILE_LIST,
    payload: userList
  };
}