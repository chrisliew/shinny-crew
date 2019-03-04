import axios from 'axios';
import {
  FETCH_USER,
  ADD_GAME_REQUEST,
  ADD_GAME_USER_REQUEST,
  FETCH_GAMES,
  FETCH_ONE_GAME,
  FETCH_USER_GAMES,
  DELETE_GAME_FROM_USER,
  FETCH_PAYMENT,
  CHANGE_EMAIL,
  SEND_EMAIL_CONFIRM
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

// Adds user to game ID
export const addGameUserRequest = gameUserId => {
  return dispatch => {
    return axios.put('/api/games', gameUserId).then(res => {
      dispatch({ type: ADD_GAME_USER_REQUEST, payload: res.data });
      console.log('Add userId to Game');
    });
  };
};

export const fetchUserGames = userID => {
  return dispatch => {
    console.log('userID', userID);
    return axios.get(`/api/games/${userID}`).then(res => {
      dispatch({ type: FETCH_USER_GAMES, payload: res.data });
    });
  };
};

export const deleteUserFromGame = gameUserIdPosition => {
  return dispatch => {
    return axios.delete('/api/game', { data: gameUserIdPosition }).then(res => {
      dispatch({ type: DELETE_GAME_FROM_USER, payload: res.data });
      console.log('Deleted One Game from User');
    });
  };
};

export const fetchOneGame = gameId => {
  return function(dispatch) {
    axios.get('/api/game/' + gameId).then(res => {
      dispatch({ type: FETCH_ONE_GAME, payload: res.data });
      console.log('Fetched One Game');
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

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_PAYMENT, payload: res.data });
};

export const changeEmail = emailUserId => async dispatch => {
  console.log('email', emailUserId);
  const res = await axios.put(`/api/email`, emailUserId);
  dispatch({ type: CHANGE_EMAIL, payload: res.data });
};

// export const sendEmailConfirm = clientGameInfo => async dispatch => {
//   const res = await axios.post('/api/email/confirm', clientGameInfo);
//   dispatch({ type: SEND_EMAIL_CONFIRM, payload: res.data });
// };

export const sendEmailConfirm = clientGameInfo => {
  return dispatch => {
    return axios.post('/api/email/confirm', clientGameInfo).then(res => {
      dispatch({ type: SEND_EMAIL_CONFIRM, payload: res.data });
      console.log('New Email Confirm Sent');
    });
  };
};
