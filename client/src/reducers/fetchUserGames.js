import { FETCH_USER_GAMES } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_GAMES:
      return action.payload;
    default:
      return state;
  }
};
