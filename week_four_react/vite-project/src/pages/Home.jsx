import React, {useState, useContext, useEffect } from 'react'
import { UserContext } from '../redux/Context'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../localStorage/getItem';
import { USER } from '../redux/constants/user';
import axios from 'axios';
import Logout from '../../components/Logout';
import Navbar from '../../components/Navbar';

 const Home = () => {
  // const { userData} = useContext(UserContext);
  const navigate = useNavigate();
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [address,setAddress] = useState('');

  

  useEffect(()=>{
    const user = getItem('user');
    if(!user){
      navigate('/',{replace:true})
    }else{

      setUsername(user.username);
      setEmail(user.email);
      setAddress(user.address);

    }
  },[]);
  return (
    <div>
      <div>
        <Navbar />
      </div>
     {username}
     {email}
     {address}
    </div>
  )
}

 
export default Home