import { ADD_GAME_USER_REQUEST } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_GAME_USER_REQUEST:
      return [...state, action.payload];
    default:
      return state;
  }
};
