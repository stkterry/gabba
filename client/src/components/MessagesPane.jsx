import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { connectSocket, disconnectSocket, watchMessages } from '../actions/socket_actions';
import { getMessages } from '../actions/message_actions';
import { selCurrentRoomName, selCurrentMessages } from '../selectors';

import MessageForm from './MessageForm';
import MessageItem from "./MessagesItem";
import usePageScrollEvent from '../hooks/usePageScrollEvent';
import useScrollTo from '../hooks/useScrollTo';

export const MessagesPane = () => {

  const roomName = useSelector(state => selCurrentRoomName(state));
  const messages = useSelector(state => selCurrentMessages(state));
  const dispatch = useDispatch();

  const scrollRef = usePageScrollEvent();
  const { ref: bottomBufferRef, nearBottom, scrollToBottom } = useScrollTo();

  useEffect(() => {
    
    dispatch(connectSocket({ room: roomName }));
    dispatch(getMessages(roomName, Date.now(), 2))

    dispatch(watchMessages(dispatch));

    return () => dispatch(disconnectSocket());
    
  }, [dispatch, roomName])

  useEffect(() => nearBottom() && scrollToBottom(), [messages, nearBottom, scrollToBottom]);


  return (
    <div className="messages-pane">
      
      <ul className="messages-pane-list" ref={scrollRef}>
        <li style={{ height: '45px' }}/>
        {messages.map((msg, idx) => <MessageItem key={idx} {...msg } />)}  
        <li style={{ height: '100px' }} ref={bottomBufferRef}/>
      </ul>

      <MessageForm />
    </div>
  )
}

export default MessagesPane;