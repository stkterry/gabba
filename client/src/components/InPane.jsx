import { useState } from 'react';

import Login from './Login';
import Signup from './Signup';

export const InPane = () => {

  const [isLogin, setIsLogin] = useState(true);

  return(
    <div className="login-pane">
        {isLogin ? <Login setIsLogin={setIsLogin}/> : <Signup setIsLogin={setIsLogin}/>}
    </div>
  )
}


export default InPane;