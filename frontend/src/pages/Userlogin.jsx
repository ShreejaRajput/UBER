import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosInstance';

const Userlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
     console.log('🔥 submit fired', email, password);
    const loginData = {
      email: email,
      password: password
    };
    try {
      console.log('Login attempt:', loginData);
      const response = await api.post('/users/login', loginData);
      console.log('Login response:', response.status, response.data);
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error.response?.status, error.response?.data || error.message);
      alert(`Login failed: ${error.response?.data?.message || 'Unauthorized. Check credentials.'}`);
    }
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
       <img className='w-16 mb-5' src="Uber-logo.png" alt="" />
      <form onSubmit={submitHandler}>
      <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
      <input id="email"
      autoComplete='email'
      required 
      value={email}
        onChange={(e)=>{
          setEmail(e.target.value);
        }}
      className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      type="email" 
      placeholder='email@example.com' />

      <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
      <input id="password"
      value={password}
      onChange={(e)=>{
        setPassword(e.target.value);
      }}
      className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      type="password" 
      placeholder='password' />

      <button
      className='bg-[#111] text-white font-semibold rounded mb-7 px-4 py-2  w-full text-lg placeholder:text-base'
      type="submit"
      >Login</button>

      <p className='text-center'>New Here? <Link to='/signup' className='text-blue-600 mb-3'>Create new Account</Link></p>
</form>
</div>
<div>
  <Link to='/captain-login' className='bg-[#10b461] flex items-center justify-center text-white font-semibold rounded px-4 py-2 w-full text-lg'
 >Sign-in as Captain</Link>
</div>
    </div>
  )
}

 export default Userlogin