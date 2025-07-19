import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(traffic-light.avif)] h-screen pt-8 flex justify-between flex-col w-full '>
        <img className='w-16 ml-8' src="Uber-logo.png" alt="" />
      <div className='bg-white pb-7 py-5 px-5'>
        <h2 className='text-2xl font-bold '>Get started with Uber</h2>
        <Link to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
      </div>
    </div>
 </div>

    

    
  )
}

export default home
