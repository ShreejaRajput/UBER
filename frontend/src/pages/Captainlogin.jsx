import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const Captainlogin = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
 
  const {captain,setCaptain} =React.useContext(CaptainDataContext)
  const navigate=useNavigate();




  const submitHandler=async(e)=>{
    e.preventDefault();
    const captainData={
      email:email,
      password
    }

    try {
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captainData)

      if(response.status===200){
        const data=response.data
        setCaptain(data.captain);
        localStorage.setItem('token',data.token);
        navigate('/captain-home')
      }
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Login error:', error);
      // Handle error appropriately, maybe show a message to the user
    }
  }

  return (
    <div className='p-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-30  mt-3 mr-100 mb-5' src="/uber-captain.png" alt="Uber Captain" />
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
          type='email'
          placeholder='email@example.com'/>

          <input 
          required
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value);
          }}
          className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type="password"
           placeholder='password' />

           <button
           type="submit"
           className='bg-[#111] text-white font-semibold rounded mb-7 px-4 py-2  w-full text-lg placeholder:text-base'
           >
            Login
           </button>
 
       <p  className='text-center-align' > Join s fleet?<Link to='/captain-signup' className='text-blue-600 mb-3'>Register as a captain</Link></p>
        </form>
      </div>
      <div>
      <Link 
      to='/login'
      className='bg-[#d5622d]  flex item-center justify-center mb-5 text-white font-semibold rounded mb-7 px-4 py-2  w-full text-lg placeholder:text-base'>Sign-in as user</Link>
    </div>
    </div>
    
  )
}


export default Captainlogin
