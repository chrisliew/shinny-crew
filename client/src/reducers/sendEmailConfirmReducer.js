import { SEND_EMAIL_CONFIRM } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case SEND_EMAIL_CONFIRM:
      return action.payload;
    default:
      return state;
  }
};
