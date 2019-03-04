import { CHANGE_EMAIL } from '../actions/types';

export default (state = '', action) => {
  switch (action.type) {
    case CHANGE_EMAIL:
      return action.payload;
    default:
      return state;
  }
};
