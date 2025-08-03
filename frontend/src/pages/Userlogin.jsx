import React, { useState,useContext } from 'react'
import {Link} from 'react-router-dom'
import { UserDataContext}  from '../context/userContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


const Userlogin = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[userData,setUserData]=useState({});


  const{user,setUser}=useContext(UserDataContext)
  const navigate=useNavigate()



  const submitHandler=async(e)=>{
    e.preventDefault();
 
    const userData={
      email:email,
      password:password
    }


    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)

    if(response.status===200){
      const data=response.data;
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')
    }

    console.log(userData)
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
       <img className='w-16 mb-5' src="Uber-logo.png" alt="" />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }} action="">
      <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
      <input 
      required 
      value={email}
        onChange={(e)=>{
          setEmail(e.target.value);
        }}
      
      className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      type="email" 
      placeholder='email@exmple.com' />

      <h3 className='text-lg font-meduim mb-2'>Enter Password</h3>
      <input 
      value={password}
      onChange={(e)=>{
        setPassword(e.target.value);
      }}
      className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      type="password" 
      placeholder='password' />

      <button
      className='bg-[#111] text-white font-semibold rounded mb-7 px-4 py-2  w-full text-lg placeholder:text-base'
      >Login</button>

      <p className='text-center-align'>New Here?<Link to='/signup'className='text-blue-600 mb-3'>Create new Account</Link></p>
</form>
</div>
<div>
  <Link to='/captain-login' className='bg-[#10b461]  flex item-center justify-center mb-5 text-white font-semibold rounded mb-7 px-4 py-2  w-full text-lg placeholder:text-base'
 >Sign-in as Captain</Link>
</div>
    </div>
  )
}

 export default Userlogin

