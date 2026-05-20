import React from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import { useState } from 'react'
import { useRef } from 'react'
import FinishRide from '../context/FinishRide'

const CaptainRiding = () => {

  const[finishRidePanel,setfinishRidePanelPanel]=useState(false);
  const finishRidePanelRef=useRef(null)

useGSAP(function(){
if(finishRidePanel){
gsap.to(finishRidePanelRef.current,{
  transform:'translateY(0)'
})
}else{
  gsap.to(finishRidePanelRef.current,{
  transform:'translateY(100%)'
})

}
},[finishRidePanel])



  return (
  <div>
      
      <div className='h-screen relative'>

        
        <div className='fixed w-full p-6 top-0 flex items-center justify-between z-50'>
          <img className='w-16 z-50' src="Uber-logo.png" alt="" />
        <Link to='/captain-home' className='z-50 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
  <i className="ri-logout-box-line text-black text-xl "></i>
</Link>
        </div>


      <div className='relative h-4/5'>
        <img
        className='h-full w-full object-cover absolute top-0 left-0 z-0'
        src="https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
        alt="" />
      </div>
      
      <div className='h-1/5 relative p-6 bg-yellow-400 flex items-center justify-between'
      onClick={()=>{
        setfinishRidePanelPanel(true)
      }}>

      <h5 className='p-3 text-center w-[95%] absolute top-0' onClick={()=>{

       }}> <i className="text-3xl text-black ri-arrow-up-s-line"></i></h5>
          <h4 className='text-xl font-semibold'>4 min away</h4>
          <button className=' text-black bg-green-600 text-gray-700 font-semibold p-3 px-10 rounded-lg mt-1'>Complete Ride</button>
      </div>

    
    </div>


    <div ref={finishRidePanelRef}  className='fixed z-10 bottom-0 h-[90%] translate-y-full bg-white w-full px-3 py-6 pt-12'>
       <FinishRide setfinishRidePanelPanel={setfinishRidePanelPanel} />
      </div>
    </div>
  )
}

export default CaptainRiding
