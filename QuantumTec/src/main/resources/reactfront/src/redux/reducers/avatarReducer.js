// reducers/avatarReducer.js

import { SET_AVATAR_ITEM_LIST, SET_AVATAR_PAGE, SET_AVATAR_CATEGORY_LIST } from '../actions/avatarActions';

const initialState = {
  itemList: [],
  page: "",
  categoryList: [],
};

function avatarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AVATAR_ITEM_LIST:
      console.log(action.payload);
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
