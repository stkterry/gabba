
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../actions/session_actions';
import { selSessionSignIn, selUser } from '../selectors';

export const Navigation = () => {

  const isSignedIn = useSelector(state => selSessionSignIn(state));
  const user = useSelector(state => selUser(state));
  const dispatch = useDispatch();

  return (
    <nav className="navigation-panel">
      <div className="navigation-app">
        <h2>Gabba</h2>
        <p>Gabba gabba, we accept you, we accept you, one of us.</p>
      </div>
      
      {isSignedIn && <div className="navigation-in">
        <h5>{user.handle}</h5>
        <button className="button" onClick={() => dispatch(logout())}>Logout</button>
      </div>}
    </nav>
  )

}


export default Navigation;