import { combineReducers } from 'redux';
import authReducer from './authReducer';
import addGameReducer from './addGameReducer';
import addGameUserReducer from './addGameUserReducer';
import fetchGames from './fetchGames';

export default combineReducers({
  auth: authReducer,
  addGame: addGameReducer,
  addGameUser: addGameUserReducer,
  fetchGames: fetchGames
});
