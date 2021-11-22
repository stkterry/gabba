import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES
} from '../actions/message_actions';


const initialState = {
  'General': {
    pageDate: null,
    messages: []
  }
}

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  
  switch(type) {
    case RECEIVE_MESSAGES: {
      const { room, messagePages = [] } = payload;

      const msgsData = messagePages.reduce((cat, page) => {
        cat.pageDate = page.created;
        cat.messages = page.messages.concat(cat.messages);
        return cat;
      }, { pageDate: null, messages: [] })

      msgsData.messages = msgsData.messages.concat(state[room].messages || []);

      return {
        ...state,
        [room]: msgsData
      }

    }

    case RECEIVE_MESSAGE: {
      const { room, message } = payload;
      const currentMsgs = state[room].messages || [];
      return {
        ...state,
        [room]: {
          ...state[room],
          messages: currentMsgs.concat([message])
        }

      }
    }

    default: 
      return state;
  }
}

export default messageReducer;