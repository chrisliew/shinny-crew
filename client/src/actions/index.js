import axios from 'axios';
import {
  FETCH_USER,
  ADD_GAME_REQUEST,
  ADD_GAME_USER_REQUEST,
  FETCH_GAMES,
  FETCH_ONE_GAME,
  DELETE_GAME_FROM_USER
} from './types';

export const fetchUser = () => {
  return function(dispatch) {
    axios.get('/api/current_user').then(res => {
      dispatch({ type: FETCH_USER, payload: res.data });
    });
  };
};

export const addGameRequest = gameDetails => {
  return dispatch => {
    return axios.post('/api/games', gameDetails).then(res => {
      dispatch({ type: ADD_GAME_REQUEST, payload: res.data });
      console.log('New Game Request Sent');
    });
  };
};

export const addGameUserRequest = gameUserId => {
  return dispatch => {
    return axios.put('/api/games', gameUserId).then(res => {
      dispatch({ type: ADD_GAME_USER_REQUEST, payload: res.data });
      console.log('Add user and game Id');
    });
  };
};

export const deleteUserFromGame = gameUserId => {
  return dispatch => {
    return axios.delete('/api/game', { data: gameUserId }).then(res => {
      dispatch({ type: DELETE_GAME_FROM_USER, payload: res.data });
      console.log('Deleted One Game from User');
    });
  };
};

export const fetchOneGame = gameId => {
  return function(dispatch) {
    axios.get('/api/games/' + gameId).then(res => {
      dispatch({ type: FETCH_ONE_GAME, payload: res.data });
    });
  };
};

export const fetchGames = () => {
  return function(dispatch) {
    axios.get('/api/games').then(res => {
      dispatch({ type: FETCH_GAMES, payload: res.data });
    });
  };
};
