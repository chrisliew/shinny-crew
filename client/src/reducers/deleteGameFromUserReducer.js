import { DELETE_GAME_FROM_USER } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case DELETE_GAME_FROM_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};
