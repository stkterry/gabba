import { useSelector, useDispatch } from 'react-redux';


import { clearSessionError, login } from '../actions/session_actions';
import { selSessionError } from '../selectors';
import useForm from '../hooks/useForm';
import { useCallback } from 'react';

export const Login = ({ setIsLogin }) => {

  const err = useSelector(state => selSessionError(state));
  const dispatch = useDispatch();

  const clearErrors = useCallback(() => err && dispatch(clearSessionError()), [err, dispatch]);

  const defaultValues = {
    handle: "",
    password: ""
  }
  const { 
    updateForm,
    formData 
  } = useForm(defaultValues, clearErrors)

  const submitForm = event => {
    event.preventDefault();
    dispatch(login(formData));
  }


  return(
    <div className="login-pane-container">
      <form className="login-pane-in">
        <h2>Login</h2>
        <label>
          <input className="input-text" type="text" placeholder="Handle" onChange={updateForm('handle')}/>
        </label>
        <label>
          <input className="input-text" type="password" placeholder="Password" onChange={updateForm('password')}/>
        </label>
        {err && <p>{err}</p>}
        <span>
          <button className="button" onClick={submitForm}>Login</button>
        </span>

        <div className="login-pane-presets">
          <h5>Premade logins...</h5>
          <div>
            <span>Username: heckus</span>
            <span>Password: password</span>
          </div>

          <div>
            <span>Username: tina</span>
            <span>Password: password</span>
          </div>
        </div>

      </form>
        
        <h5>Or signup instead...</h5>
        <span><button className="button" onClick={() => setIsLogin(false)}>Signup</button></span>
    </div>
  )
}

export default Login;