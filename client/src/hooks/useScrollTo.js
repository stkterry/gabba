import { useRef } from 'react';


const useScrollTo = () => {

  const ref = useRef(null);

  const scrollToBottom = () => 
    ref.current
      .scrollIntoView({ block: "end", behavior: "smooth" });
    
  const jumpToBottom = () => 
  ref.current
    .scrollIntoView({ block: "end" });

  const nearBottom = () => 
  ref.current
    .getBoundingClientRect().bottom - 60 <= (window.innerHeight + 100);


  return { ref, scrollToBottom, jumpToBottom, nearBottom }

}

export default useScrollTo;