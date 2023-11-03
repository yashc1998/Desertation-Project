import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
        console.log('Alert Reducer [Set]: ' + payload.msg)
      return [...state, payload];
    case REMOVE_ALERT:
        console.log('Alert Reducer [Remove]: ' + payload)
      return state.filter((alert) => alert.id !== payload);
    default:
        console.log('Alert Reducer [Default]: ' + payload)
      return state;
  }
}

export default alertReducer;