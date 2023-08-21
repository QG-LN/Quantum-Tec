// actions/avatarActions.js

export const SET_AVATAR_ITEM_LIST = 'SET_AVATAR_ITEM_LIST';

export function setAvatarItemList(itemList) {
  return {
    type: SET_AVATAR_ITEM_LIST,
    payload: itemList
  };
}
