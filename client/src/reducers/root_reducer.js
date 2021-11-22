import { combineReducers } from 'redux';

import { RECEIVE_USER_LOGOUT } from '../actions/session_actions';

import session from './session_reducer';
import messages from './message_reducer';
import rooms from './rooms_reducer';


const appReducer = combineReducers({
  session,
  messages,
  rooms
});

const rootReducer = (state, action) => {
  const { type } = action;

  switch(type) {
    case RECEIVE_USER_LOGOUT:
      return appReducer(undefined, action);

    default:
      return appReducer(state, action);
  }
}

export default rootReducer;