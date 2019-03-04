import { combineReducers } from 'redux';
import authReducer from './authReducer';
import addGameReducer from './addGameReducer';
import addGameUserReducer from './addGameUserReducer';
import fetchGames from './fetchGames';
import fetchUserGames from './fetchUserGames';
import fetchOneGameReducer from './fetchOneGameReducer';
import paymentReducer from './paymentReducer';
import changeEmailReducer from './changeEmailReducer';
import sendEmailConfirmReducer from './sendEmailConfirmReducer';

export default combineReducers({
  auth: authReducer,
  addGame: addGameReducer,
  addGameUser: addGameUserReducer,
  fetchGames: fetchGames,
  fetchUserGames: fetchUserGames,
  fetchOneGame: fetchOneGameReducer,
  payment: paymentReducer,
  changeEmail: changeEmailReducer,
  sendEmailConfirm: sendEmailConfirmReducer
});
