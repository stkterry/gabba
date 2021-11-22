import { useSelector } from "react-redux";

import MessagesPane from "../components/MessagesPane"
import Navigation from "../components/Navigation"
import InPane from "../components/InPane"
import { selSessionSignIn } from "../selectors";

export const Main = () => {

  const isSignedIn = useSelector(state => selSessionSignIn(state));

  return (<>
    <Navigation />
    {isSignedIn ? <MessagesPane /> : <InPane /> }
  </>)
}

export default Main;
