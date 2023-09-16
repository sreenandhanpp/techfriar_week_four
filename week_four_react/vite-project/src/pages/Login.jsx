import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { USER } from '../redux/constants/user';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SubmitHandler = (e) => {
    e.preventDefault();
    try {
      dispatch({ type: USER.LOGIN_REQUEST });
      axios.post('http://localhost:5000/api/login', {
        email,
        password
      }).then(res => {
        console.log(res);
        console.log(res.status);
        
        if (res.status == 200) {
          dispatch({ type: USER.LOGIN_SUCCESS, payload: res.data });
          console.log(res.data.isAdmin)
          if(res.data.isAdmin) {
            navigate('/admin-dashboard', { replace: true });
          }else{
            console.log('redirecting');
            navigate('/',{replace:true})
          }
        } else {
          dispatch({ type: USER.LOGIN_FAILED, payload: res.data });
        }
      })
    } catch (err) {
      dispatch({ type: USER.LOGIN_FAILED, payload: "something went wrong" });
    }
  }
  return (
    <div className='edit-body'>
    <div className="container">
        <form id="form" className="form">
            <h2>LOGIN !</h2>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    name='email'
                    // value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                />

            </div>
            <Link to={'/signup'}> <p className='radirect-user'>Create an account?</p> </Link>
            <button onClick={SubmitHandler} type="submit">Login</button>
        </form>
    </div>



</div>
  )
}

export default Login
