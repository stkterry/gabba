import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useForm from '../hooks/useForm';
import { clearSessionError, signup } from '../actions/session_actions';
import { selSessionError } from '../selectors';


export const Signup = ({ setIsLogin }) => {

  const err = useSelector(state => selSessionError(state));
  const dispatch = useDispatch();

  const clearErrors = useCallback(() => err && dispatch(clearSessionError()), [err, dispatch]);

  const [passMatch, setPassMatch] = useState(true);

  const defaultValues = {
    handle: "",
    password: "",
    confirmPassword: ""
  }

  const { 
    updateForm,
    formData 
  } = useForm(defaultValues, clearErrors)

  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setPassMatch(false);
    } else setPassMatch(true);
  }, [formData])


  const submitForm = event => {
    event.preventDefault();

    if (!passMatch || err) return;
    dispatch(signup(formData));
  }

  return(
    <div className="login-pane-container">
      <form className="login-pane-in">
        <h2>Signup</h2>
        <label>
          <input className="input-text" type="text" placeholder="Handle" onChange={updateForm("handle")}/>
        </label>
        <label>
          <input className="input-text" type="password" placeholder="Password" onChange={updateForm("password")}/>
        </label>
        <label>
          <input className="input-text" type="password" placeholder="Confirm Password" onChange={updateForm("confirmPassword")}/>
        </label>
        {err && <p>{err}</p>}
        {!passMatch && <p>Passwords much match.</p>}
        <span>
          <button className="button" onClick={submitForm}>Login</button>
        </span>
        
      </form>
      <h5>Or Login instead...</h5>
      <span><button className="button" onClick={() => setIsLogin(true)}>Login</button></span>
    </div>
  )
}

export default Signup;