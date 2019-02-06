import { FETCH_ONE_GAME } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ONE_GAME:
      return action.payload;
    default:
      return state;
  }
};
