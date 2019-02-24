import { FETCH_PAYMENT } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PAYMENT:
      return action.payload;
    default:
      return state;
  }
};
