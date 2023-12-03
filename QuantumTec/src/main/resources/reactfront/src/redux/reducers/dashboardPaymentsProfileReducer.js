// reducers/dashboardPaymentsProfileReducer.js

import { SET_DASHBOARD_PAYMENTS_PROFILE_LIST } from '../actions/dashboardPaymentsProfileAction';

const initialState = {
  dashboardPaymentsList: []
};

function dashboardPaymentsProfileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DASHBOARD_PAYMENTS_PROFILE_LIST:
      return {
        ...state,
        dashboardPaymentsList: action.payload
      };
    default:
      return state;
  }
}

export default dashboardPaymentsProfileReducer;
