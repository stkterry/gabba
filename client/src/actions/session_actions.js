import axios from 'axios';

import {
  setUserId
} from './socket_actions';

export const APICalls = {
  signup: userData => axios.post("/api/users/register", userData),
  login: userData => axios.post("/api/users/login", userData)
}

export const RECEIVE_USER_LOGIN = 'RECEIVE_USER_LOGIN';
export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERROR = 'RECEIVE_SESSION_ERROR';
export const CLEAR_SESSION_ERROR = 'CLEAR_SESSION_ERROR';

// Dispatch on sign in
export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  payload: { user }
})

export const receiveUserLogin = () => ({
  type: RECEIVE_USER_LOGIN
})

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
})

export const receiveSessionError = err => ({
  type: RECEIVE_SESSION_ERROR,
  payload: { err }
})

export const receiveClearSessionError = () => ({
  type: CLEAR_SESSION_ERROR
})

export const signup = user => dispatch => APICalls.signup(user)
  .then(res => {
      dispatch(receiveCurrentUser(res.data.user));
      dispatch(setUserId(res.data.user._id));
    },
    err => dispatch(receiveSessionError(err.response.data.err))
  )

export const login = user => dispatch => APICalls.login(user)
  .then(res => {
      dispatch(receiveCurrentUser(res.data.user));
      dispatch(setUserId(res.data.user._id));
    },
    err => dispatch(receiveSessionError(err.response.data.err))
  )

export const logout = () => dispatch =>
  dispatch(logoutUser());

export const clearSessionError = () => dispatch =>
  dispatch(receiveClearSessionError())