// actions/userActions.js

export const SET_CASH_CHANGE = 'SET_CASH_CHANGE';

export function setCashChange(cashChange) {
  return {
    type: SET_CASH_CHANGE,
    payload: cashChange
  };
}