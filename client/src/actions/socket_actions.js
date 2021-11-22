import {
  receiveMessage
} from './message_actions';


export const SET_USERID = 'SET_USERID';

export const SOCKET = 'SOCKET';
export const SUCCESS = 'SUCCESS';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_SUCCESS = 'SEND_SUCCESS';
export const SEND_FAILURE = 'SEND_FAILURE';

export const CONNECT = 'CONNECT';
export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const CONNECT_FAILURE = 'CONNECT_FAILURE';

export const DISCONNECT = 'DISCONNET';

export const WATCH_MESSAGES = 'WATCH_MESSAGES';


export const setUserId = userId => ({
  type: SOCKET,
  types: [SET_USERID, null, null],
  promise: socket => socket.setUserId(userId)
})

export const connectSocket = opts => ({
  type: SOCKET,
  types: [CONNECT, CONNECT_SUCCESS, CONNECT_FAILURE],
  promise: socket => socket.connect(opts)
})

export const disconnectSocket = () => ({
  type: SOCKET,
  types: [DISCONNECT, null, null],
  promise: socket => socket.disconnect()
})

export const sendMessage = messageData => ({
  type: SOCKET,
  types: [SEND_MESSAGE, SEND_SUCCESS, SEND_FAILURE],
  promise: socket => socket.emit('sendMessage', messageData) // messageData = { message, room }
})

export const watchMessages = dispatch => ({
  type: SOCKET,
  types: [WATCH_MESSAGES, null, null],
  promise: client => client.on('receiveMessage', messageData => dispatch(receiveMessage(messageData)))
})