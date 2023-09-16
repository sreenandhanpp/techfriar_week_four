import axios from 'axios';
import React, { useDebugValue, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ADMIN } from '../redux/constants/admin';
import { useDispatch } from 'react-redux';

const CreateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [fullname, setfullname] = useState('');
    const [phone, setPhone] = useState('');
    const [password ,setPassword] = useState('');
    const {id} = useParams();
    const [values ,setValues] = useState({
        id:id,
        username:'',
        email:'',
        address:'',
        fullname:'',
        phone:''
    });

    const SubmitHandler = async (e) => {
        e.preventDefault();
        console.log("submit")
        try{
            dispatch({type:ADMIN.CREATE_USER_REQUEST});
            axios.post('http://localhost:5000/admin/api/create-user',{
                id,
                username,
                email,
                address,
                fullname,
                password,
                phone
            }).then(res=>{
                console.log(res)
                if(res.status == 200){
                  dispatch({type:ADMIN.CREATE_USER_SUCCESS,payload:res.data});
                  navigate('/admin-dashboard',{replace:true});
                }
            });

        }catch(err){
          dispatch({type:ADMIN.DELETE_USER_FAILED,payload:"error"});
        }
    }

    return (
        <div className='edit-body'>
            <div className="container">
                <form id="form" className="form">
                    <h2>Create User !</h2>
                    <div className="form-control">
                        <label htmlFor="username">Full name</label>
                        <input
                            type="text" id="fullname"
                            placeholder="Enter fullname"
                            name='fullname'
                            // value={fullname}
                            onChange={(e) => setfullname(e.target.value)}
                             />
                             <ErrAlert errors={err} label={'fullname'} />
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
                        <ErrAlert errors={err} label={'username'} />
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
                        <ErrAlert errors={err} label={'email'} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Enter address"
                            name='address'
                            // value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <ErrAlert errors={err} label={'address'} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Enter phone"
                            name='phone'
                            // value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <ErrAlert errors={err} label={'phone'} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ErrAlert errors={err} label={'password'} />
                    </div>
                    <button onClick={SubmitHandler} type="submit">Update</button>
                </form>
            </div>



        </div>
    )
}

export default CreateUser
