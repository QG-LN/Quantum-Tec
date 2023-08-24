// actions/avatarActions.js

export const SET_AVATAR_ITEM_LIST = 'SET_AVATAR_ITEM_LIST';

export function setAvatarItemList(itemList) {
  return {
    type: SET_AVATAR_ITEM_LIST,
    payload: itemList
  };
}

export const SET_AVATAR_PAGE = 'SET_AVATAR_PAGE';

export function setAvatarPage(page) {
  return {
    type: SET_AVATAR_PAGE,
    payload: page
  };
}

export const SET_AVATAR_CATEGORY_LIST = 'SET_AVATAR_CATEGORY_LIST';

export function setAvatarCategoryList(categoryList) {
  return {
    type: SET_AVATAR_CATEGORY_LIST,
    payload: categoryList
  };
}