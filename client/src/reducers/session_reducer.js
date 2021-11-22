import { 
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERROR,
  CLEAR_SESSION_ERROR,
  RECEIVE_USER_LOGIN,
  RECEIVE_USER_LOGOUT
} from '../actions/session_actions';


const initialState = {
  user: {},
  isSignedIn: false,
  err: null
}

const sessionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case RECEIVE_CURRENT_USER: {
      return {
        ...state,
        user: payload.user,
        isSignedIn: true
      }
    }

    case RECEIVE_USER_LOGOUT: {
      return initialState;
    }

    case RECEIVE_USER_LOGIN: {
      return {
        ...state,
        isSignedIn: true
      }
    }

    case RECEIVE_SESSION_ERROR: {
      return {
        ...state,
        err: payload.err
      }
    }

    case CLEAR_SESSION_ERROR: {
      return {
        ...state,
        err: null
      }
    }

    default:
      return state;
  }
}

export default sessionReducer;