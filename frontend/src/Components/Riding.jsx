import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>

<Link to='/home' className='fixed top-5 left-5 z-50 h-10 w-10 bg-black flex items-center justify-center rounded-full'>
 <i className="ri-home-3-line"></i>
</Link>


      <div className='relative h-1/2'>
        <img
        className='h-full w-full object-cover absolute top-0 left-0 z-0'
        src="https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
        alt="" />
      </div>
      
      <div className='h-1/2 p-4'>
              <div className='flex items-center justify-between '>
                <img className='h-12 ' src="https://mobile-content.uber.com/launch-experience/top_bar_rides_3d.png" alt="" />
              <div className='text-right'>
                <h2 className='text-lg font-medium'>Shreeja </h2>
                <h4 className='text-xl font-semibold -mt-2 -md-1'>MH 12 KZ 6898</h4>
                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>

              </div>
        </div>



      <div className="flex gap-2 justify-between flex-col items-center">

        <div className="w-full mt-5">
        
          <div className="flex items-center gap-5  p-3 border-b-1">
            <i className="fa-solid fa-location-arrow"></i>

            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-small -mt-1 text-gray-600">
                Kankariya Talab Ahemadabad
              </p>
            </div>

          </div>

          <div className="flex items-center gap-5 ml-3">
            <i className="fa-solid fa-money-bill"></i>
            <div>
              <h3 className="text-lg font-medium"> ₹193.20</h3>
              <p className="text-small -mt-1 text-gray-600">Cash cash</p>
            </div>
          </div>
        </div>
      </div>
        <button className='w-full bg-green-600 font-semibold p-2 text-white rounded-lg mt-5'>Make a payment</button>
      </div>
    </div>
  )
}

export default Riding
