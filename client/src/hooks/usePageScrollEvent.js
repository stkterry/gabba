import { useState,  useRef, useEffect, useCallback, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selCurrentPageDate, selCurrentRoomName } from '../selectors';
import { getMessages } from '../actions/message_actions';


const usePageScrollEvent = () => {

  const pageDate = useSelector(state => selCurrentPageDate(state));
  const roomName = useSelector(state => selCurrentRoomName(state));

  const dispatch = useDispatch();

  const scrollRef = useRef(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  const handleScrollEvent = useCallback(() => {
    if (scrollRef.current.scrollTop === 0 && pageDate) {
      setPrevScrollHeight(scrollRef.current.scrollHeight);
      dispatch(getMessages(roomName, pageDate, 1));
    }
  }, [roomName, pageDate, dispatch])

  useEffect(() => {

    const scroll = scrollRef.current;

    scroll
      .addEventListener('scroll', handleScrollEvent);

    scroll
      .scrollTo({ top: scrollRef.current.scrollHeight - prevScrollHeight })

    return () => {
      if (scroll) {
        scroll
          .removeEventListener('scroll', handleScrollEvent)
      }
    }
  }, [pageDate, handleScrollEvent, prevScrollHeight])


  return scrollRef;

}

export default usePageScrollEvent;

