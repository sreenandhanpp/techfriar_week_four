import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER } from '../redux/constants/user';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [fullname, setfullname] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState([]);
  const dispatch = useDispatch();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    console.log("submit")
    try {
      dispatch({ type: USER.SIGNUP_REQUEST });
      axios.post('http://localhost:5000/api/signup', {
        username,
        email,
        address,
        fullname,
        password,
        phone
      }).then(res => {
        // console.log(res)
        if (res.status == 200) {
          dispatch({ type: USER.SIGNUP_SUCCESS, payload: res.data });
          if (res.data.isAdmin) {
            navigate('/admin-dashboard', { replace: true });
          } else {
            navigate('/', { replace: true });
          }

        }else{
          console.log("error")
        }
      }).catch(error=>{
        // console.log(error)
      setErr(error)
      console.log(error)
      dispatch({ type: USER.SIGNUP_SUCCESS, errors: error });
      });

    } catch (err) {
      // console.log(err)
      setError(err)
      dispatch({ type: USER.SIGNUP_SUCCESS, errros: "something went wrong" });
    }
  }
  return (
    
    <div className='edit-body'>
      {err}
      <div className="container">
        <form id="form" className="form">
          <h2>Create Account !</h2>
          <div className="form-control">
            <label htmlFor="username">Full name</label>
            <input
              type="text" id="fullname"
              placeholder="Enter username"
              name='fullname'
              // value={fullname}
              onChange={(e) => setfullname(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text" id="username"
              placeholder="Enter username"
              name='username'
              // value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter username"
              name='address'
              // value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

          </div>
          <div className="form-control">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter username"
              name='phone'
              // value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <Link to={'/login'}> <p className='radirect-user'>Already have an account?</p> </Link>

          <button onClick={SubmitHandler} type="submit">Sign Up</button>
        </form>
      </div>



    </div>
  )
}

export default SignUp
