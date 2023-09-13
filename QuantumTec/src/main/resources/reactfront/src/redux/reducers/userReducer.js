// reducers/userReducer.js

import { SET_CASH_CHANGE } from '../actions/userActions';

const initialState = {
  cashChange: 0
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CASH_CHANGE:
      return {
        ...state,
        cashChange: action.payload
      };
    default:
      return state;
  }
}

export default userReducer;
