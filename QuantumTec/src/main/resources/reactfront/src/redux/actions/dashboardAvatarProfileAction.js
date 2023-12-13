export const SET_DASHBOARD_AVATAR_PROFILE_LIST = 'SET_DASHBOARD_AVATAR_PROFILE_LIST';

export function setDashboardAvatarProfileList(itemList) {
  return {
    type: SET_DASHBOARD_AVATAR_PROFILE_LIST,
    payload: itemList
  };
}