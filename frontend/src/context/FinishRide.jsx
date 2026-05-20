import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
  <div >
      <h5 className='p-3 text-center w-full absolute top-0' onClick={()=>{
     props.setfinishRidePanelPanel(false)
       }}> <i className="text-3xl text-gray-200 ri-arrow-down-line"></i></h5>
       <h3 className='text-xl font-semibold mb-3'>Finih this ride !</h3>

       <div className='flex items-ceter justify-between gap-3 p-4  border-2 border-yellow-400 rounded-lg mt-3'>
        <div className='flex items-center gap-3'>
            <img className='h-12 w-12 rounded-full object-cover' src="https://imgs.search.brave.com/haNN-t45asUYUUMVdM2E724FMdZ_8p8mt_JfPR14vy8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzA0LzUyLzA3/LzM2MF9GXzYwNDUy/MDc4MF9mSjlxbTVH/MGtmemZrQVRlOFhG/OFBVV3VkaXYwdllI/Si5qcGc" alt="" />
            <h2 className='text-lg font-medium'>Halley Marshall </h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
       </div>


       <div className='flex gap-2 justify-between flex-col items-center'>
       
       
       
       <div className='w-full mt-5'>
       <div className='flex items-center gap-5 p-3 border-b-1'>
       <i className="text-lg ri-map-pin-line"></i>
       <div>
        <h3 className='text-lg font-medium'>562/11-A</h3>
        <p className='text-small -mt-1 text-gray-600'>Kankariya Talab Ahemadabad</p>
       </div>
       </div>

       <div className='flex items-center gap-5  p-3 border-b-1'>
        <i className="ri-map-pin-4-line"></i>
       <div>
        <h3 className='text-lg font-medium'>562/11-A</h3>
        <p className='text-small -mt-1 text-gray-600'>Kankariya Talab Ahemadabad</p>
       </div>
       </div>
    
    <div className='flex items-center gap-5 ml-3'>
    <i className=" ri-money-rupee-circle-fill"></i>
       <div>
        <h3 className='text-lg font-medium'> ₹193.20</h3>
        <p className='text-small -mt-1 text-gray-600'>Cash cash</p>
       </div></div>
       </div>


      <div className='mt-6 w-full'> 
        
        <Link to='/captain-home' className='w-full flex  justify-center text-white bg-green-600 text-lg font-semibold p-3 rounded-lg mt-5'>Finish Ride</Link>

        <p className='text-red-500 ml-10 text-xs mt-35'>Click on finish ride if you have completed payment</p>
   
    </div>
    </div>
    </div>
  )
}

export default FinishRide
