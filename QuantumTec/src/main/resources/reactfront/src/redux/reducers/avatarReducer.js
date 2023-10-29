// reducers/avatarReducer.js

import { SET_AVATAR_ITEM_LIST, SET_AVATAR_PAGE, SET_AVATAR_CATEGORY_LIST } from '../actions/avatarActions';

const initialState = {
  itemList: JSON.parse(localStorage.getItem('avatarItemList')) || [],
  page: "",
  categoryList: [],
};

function avatarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AVATAR_ITEM_LIST:
      // reducer에서 상태를 업데이트할 때마다 로컬 스토리지에도 저장
      localStorage.setItem('avatarItemList', JSON.stringify(action.payload));
      return {
        ...state,
        itemList: action.payload
      };
    case SET_AVATAR_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case SET_AVATAR_CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.payload
      };
    default:
      return state;
  }
}

export default avatarReducer;
