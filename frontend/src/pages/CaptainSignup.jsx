import React from 'react'
import {Link} from 'react-router-dom'

const CaptainSignup = () => {


  const[email,setEmail]=React.useState('');
  const[password,setPassword]=React.useState('');
  const[firstName,setFirstName]=React.useState('');
  const[lastName,setLastName]=React.useState('');
  const[captainData,setCaptainData]=React.useState();

  const submitHandler=(e)=>{
    e.preventDefault();
    setCaptainData({
      fullName:{
        firstName:firstName,
        lastName:lastName,
      },
      email:email,
      password:password
    })
    console.log(captainData);
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }

  return (
    <div className='py-5 px-3 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-30 mb-5' src="/uber-captain.png" alt="" />
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}
        action="">
                    <h3 className='text-base font-medium mb-2'>What's your Name?</h3>

                    <div className='flex gap-4 mb-5'>
                      <input
                      required
                      className='bg-[#eeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-base'
                      type="text" 
                      placeholder='Firstname'
                      value={firstName}
                      onChange={(e)=>{
                        setFirstName(e.target.value);
                      }}/>

                      <input 
                      type="text"
                       required
                      className='bg-[#eeee]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-base' 
                      placeholder='Lastname' 
                      value={lastName}
                      onChange={(e)=>{
                        setLastName(e.target.value);
                      }}/>
                    </div>

          <h3 className='text-base font-medium mb-2'>What's your email?</h3>

          <input 
          
          required
          
          className='bg-[#eeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type='email'
          placeholder='email@example.com' 
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value);
          }}
          />

          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input 
          required
          value={password}
          className='bg-[#eeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type="password" 
          placeholder='password'
          onChange={(e)=>{
            setPassword(e.target.value);
          }}/>

          <button
            className='bg-[#111] text-white font-semibold rounded mb-7 px-4 py-2 w-full text-lg placeholder:text-base'>
            Sign-Up
          </button>
          <p className='text-center-align'>Already a User?<Link to='/captain-login' className='text-blue-600 mb-3'>Login </Link></p>
        </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTHA and the <span className='underline'>Google Privacy policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
      
    </div>
  )
}

export default CaptainSignup
