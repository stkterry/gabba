import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sendMessage } from '../actions/socket_actions';
import { selCurrentRoomName, selUser } from '../selectors';


const MessageForm = () => {

  const user = useSelector(state => selUser(state));
  const roomName = useSelector(state => selCurrentRoomName(state));
  const dispatch = useDispatch();
  
  const [isTooLong, setIsTooLong] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (content.length > 256 && !isTooLong) setIsTooLong(true)
    else if (content.length < 256 && isTooLong) setIsTooLong(false)
  }, [content, isTooLong])

  const onEnter = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      if (isTooLong || !content.trim().length) return;
      dispatch(sendMessage({ room: roomName, message: { handle: user.handle, content} }));
      setContent("");
    }
  }

  return (
    <div className="messages-pane-form-container">
      <form className="messages-pane-form">
        <textarea 
          placeholder="Type new message...&#10;Newline: Shift+Enter&#10;Submit: Enter"
          onChange={event => setContent(event.target.value)}
          value={content}
          onKeyDown={onEnter} 
        />
        {isTooLong && <p>Message length too long! ({content.length}/256)</p>}
      </form>
    </div>
  )
}

export default MessageForm;