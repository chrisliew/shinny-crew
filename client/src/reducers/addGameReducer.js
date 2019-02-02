import { ADD_GAME_REQUEST } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case ADD_GAME_REQUEST:
      return action.payload;
    default:
      return state;
  }
};
