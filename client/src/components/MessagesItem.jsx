import { timeDisplay } from '../util/time';

export const MessageItem = ({ handle, date, content }) => (
  <li className="message-item">
    <header><h5>{handle}</h5> <h6>{timeDisplay.calender(date)}</h6></header>
    <p>{content}</p>
  </li>
)



export default MessageItem;


