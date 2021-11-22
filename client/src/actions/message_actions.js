import axios from 'axios'

export const APICalls = {
  getMessages: (room, pageDate, limit) => axios.get(`/api/messages/${room}/${pageDate}/${limit}`),
  postMessage: messageData => axios.post('/api/messages/post', messageData)
}


export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';


export const receiveMessages = messagesData => ({
  type: RECEIVE_MESSAGES,
  payload: messagesData // { messagePages (array), room }
})
export const receiveMessage = messageData => ({
  type: RECEIVE_MESSAGE,
  payload: messageData // { message, room }
})

export const getMessages = (room, pageDate, limit) => dispatch => APICalls.getMessages(room, pageDate, limit)
  .then(res => dispatch(receiveMessages(res.data)))
  .catch(err => console.log(err))

export const postMessage = messageData => dispatch => APICalls.postMessage(messageData)
  .then(res => dispatch(receiveMessage(res)))
  .catch(err => console.log(err));

