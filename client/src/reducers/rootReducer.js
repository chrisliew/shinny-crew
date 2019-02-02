import { combineReducers } from 'redux';
import authReducer from './authReducer';
import addGameReducer from './addGameReducer';
import fetchGames from './fetchGames';

export default combineReducers({
  auth: authReducer,
  addGame: addGameReducer,
  fetchGames: fetchGames
});
