import React from 'react'

const ConfirmedRide = (props) => {
  return (
    <div>
      <h5 className='p-3 text-center w-full absolute top-0' onClick={()=>{
        props.setvehiclePanel(false);
       }}> <i className="text-3xl text-gray-200 fa-solid fa-angle-down"></i></h5>
       <h3 className='text-xl font-semibol mb-3'>Confirm your Ride</h3>

       <div className='flex gap-2 justify-between flex-col items-center'>
       <img className='h-27 ' src="https://mobile-content.uber.com/launch-experience/top_bar_rides_3d.png" alt="" />
       
       
       <div className='w-full mt-5'>
       <div className='flex items-center gap-5 p-3 border-b-1'>
       <i className="text-lg fa-solid fa-location-crosshairs"></i>
       <div>
        <h3 className='text-lg font-medium'>562/11-A</h3>
        <p className='text-small -mt-1 text-gray-600'>Kankariya Talab Ahemadabad</p>
       </div>
       </div>

       <div className='flex items-center gap-5  p-3 border-b-1'>
        <i className="fa-solid fa-location-arrow"></i>
       <div>
        <h3 className='text-lg font-medium'>562/11-A</h3>
        <p className='text-small -mt-1 text-gray-600'>Kankariya Talab Ahemadabad</p>
       </div>
       </div>
    
    <div className='flex items-center gap-5 ml-3'>
        <i className="fa-solid fa-money-bill"></i>
       <div>
        <h3 className='text-lg font-medium'> ₹193.20</h3>
        <p className='text-small -mt-1 text-gray-600'>Cash cash</p>
       </div></div>
       </div>

       <button onClick={() =>{
        props.setVehicalFound(true) 
      props.setvehiclePanel(false)
    }} 
        className='w-full bg-green-600 font-semibold p-2 rounded-lg mt-5'>Confirm</button>
    </div>
    </div>
  )
}

export default ConfirmedRide

