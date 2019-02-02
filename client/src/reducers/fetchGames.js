import { FETCH_GAMES } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_GAMES:
      return action.payload || false;
    default:
      return state;
  }
};
