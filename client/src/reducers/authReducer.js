import { FETCH_USER, FETCH_USER_NORMAL } from '../actions/types';

export default (state = '', action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case FETCH_USER_NORMAL:
      return action.payload || false;
    default:
      return state;
  }
};
