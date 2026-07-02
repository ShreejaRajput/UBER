import React,{useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'



const CaptainDetails = () => {

  const {captain}=useContext(CaptainDataContext)
  return (
    <div>
        <div className='flex items-center justify-between'>
          <div  className='flex items-center justify-start gap-3'>
          <img className='h-10 w-10 rounded-full object-cover' src="https://imgs.search.brave.com/rm1jAQLV7flFsWLoSWCR9voPzusLKofN_SOozrpYUrQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE2LzkwLzkzLzYz/LzM2MF9GXzE2OTA5/MzYzNjBfajNDMFM2/aDltTVlEVm1lenkz/RU9Ia1Bha1VabWpm/eHcuanBn" alt="" />
          <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname+ " "+captain.fullname.lastname }</h4>
         </div>
            <div>
        <h4 className='text-xl font-semibold'>₹{captain.earnings}</h4> 
        <p className='text-sm font-medium text-gray-600'>Earned</p>
        </div>
      </div>



      <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-4 items-start' >   
    <div className='text-center'>
      <i className="tex-2xl font-thin ri-time-line"></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className='text-sm text-gray-600'>Hours Online</p>
    </div >
    <div className='text-center'>
      <i className="tex-2xl font-thin ri-speed-up-line"></i>
       <h5 className='text-lg font-medium'>10.2</h5>
      <p className='text-sm text-gray-600'>Hours Online</p>
    </div>
    <div className='text-center'>
      <i className="tex-2xl font-thin ri-booklet-line"></i>
         <h5 className='text-lg font-medium'>10.2</h5>
      <p className='text-sm text-gray-600'>Hours Online</p>
    </div>
</div>
    </div>
  )
}

export default CaptainDetails
