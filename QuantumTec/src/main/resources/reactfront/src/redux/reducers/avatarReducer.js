// reducers/avatarReducer.js

import { SET_AVATAR_ITEM_LIST } from '../actions/avatarActions';

const initialState = [];

function avatarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AVATAR_ITEM_LIST:
      return action.payload;
    default:
      return state;
  }
}

export default avatarReducer;
